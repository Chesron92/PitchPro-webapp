import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc, onSnapshot, Timestamp, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { Chat, Message, ChatWithUserDetails } from '../types/message';

interface MessageContextType {
  chats: ChatWithUserDetails[];
  activeChat: ChatWithUserDetails | null;
  messages: Message[];
  loadingChats: boolean;
  loadingMessages: boolean;
  error: string | null;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  createNewChat: (userId: string) => Promise<string>;
  setActiveChatById: (chatId: string) => Promise<void>;
  markChatAsRead: (chatId: string) => Promise<void>;
  getUnreadCount: () => number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages moet binnen een MessageProvider gebruikt worden');
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<ChatWithUserDetails[]>([]);
  const [activeChat, setActiveChat] = useState<ChatWithUserDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingChats, setLoadingChats] = useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Luisteren naar chats bij het inloggen van een gebruiker
  useEffect(() => {
    if (!currentUser) {
      setChats([]);
      setActiveChat(null);
      setMessages([]);
      setLoadingChats(false);
      return;
    }

    setLoadingChats(true);
    setError(null);

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('lastMessageTimestamp', 'desc')
    );

    // Real-time subscription op chats
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const chatPromises = snapshot.docs.map(async (docSnapshot) => {
            const chatData = docSnapshot.data() as Chat;
            
            // Haal gegevens op van de andere persoon in de chat
            const otherUserId = chatData.participants.find(id => id !== currentUser.uid);
            
            if (!otherUserId) {
              console.error('Geen andere gebruiker gevonden in chat', chatData.id);
              return null;
            }
            
            // Haal gebruikersgegevens op
            const userDocRef = doc(db, 'users', otherUserId);
            const userDoc = await getDoc(userDocRef);
            
            if (!userDoc.exists()) {
              console.error('Gebruiker niet gevonden', otherUserId);
              return null;
            }
            
            const userData = userDoc.data() as DocumentData;
            
            // Bepaal de unreadCount voor de huidige gebruiker
            let unreadCount = 0;
            if (typeof chatData.unreadCount === 'number') {
              // Als unreadCount een getal is, gebruik dat getal
              unreadCount = chatData.unreadCount;
            } else if (typeof chatData.unreadCount === 'object' && chatData.unreadCount !== null) {
              // Als unreadCount een object is (Record<string, number>), gebruik de waarde voor de huidige gebruiker
              unreadCount = chatData.unreadCount[currentUser.uid] || 0;
            }
            
            return {
              ...chatData,
              id: docSnapshot.id,
              otherUser: {
                id: otherUserId,
                displayName: (userData.displayName as string) || (userData.name as string) || 'Onbekende gebruiker',
                photoURL: (userData.photoURL as string) || 
                         (userData.profileImage as string) || 
                         (userData.profilePhoto as string) || 
                         (userData.profile?.profilePhoto as string) || 
                         (userData.profile?.profileImage as string) || 
                         '',
                role: (userData.role as string) || (userData.userType as string) || '',
              },
              unreadCount: unreadCount
            } as ChatWithUserDetails;
          });
          
          const resolvedChats = await Promise.all(chatPromises);
          const validChats = resolvedChats.filter(chat => chat !== null) as ChatWithUserDetails[];
          
          setChats(validChats);
          setLoadingChats(false);
        } catch (err) {
          console.error('Fout bij het ophalen van chats:', err);
          setError('Kon chats niet laden. Probeer het later opnieuw.');
          setLoadingChats(false);
        }
      },
      (err) => {
        console.error('Fout bij chat subscription:', err);
        setError('Kon chats niet laden. Probeer het later opnieuw.');
        setLoadingChats(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Luisteren naar berichten wanneer een actieve chat is geselecteerd
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);
    
    const messagesRef = collection(db, 'chats', activeChat.id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Message));
        
        setMessages(messagesData);
        setLoadingMessages(false);
      },
      (err) => {
        console.error('Fout bij messages subscription:', err);
        setError('Kon berichten niet laden. Probeer het later opnieuw.');
        setLoadingMessages(false);
      }
    );
    
    return () => unsubscribe();
  }, [activeChat]);

  // Functie om berichten te sturen
  const sendMessage = async (chatId: string, text: string) => {
    if (!currentUser) {
      throw new Error('Je moet ingelogd zijn om berichten te sturen');
    }
    
    try {
      const messageData = {
        senderId: currentUser.uid,
        text,
        timestamp: Timestamp.now(),
        read: false
      };
      
      // Voeg het bericht toe aan de subcollectie 'messages'
      await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
      
      // Haal de huidige chat op om de andere deelnemer te vinden
      const chatDoc = await getDoc(doc(db, 'chats', chatId));
      if (!chatDoc.exists()) {
        throw new Error('Chat niet gevonden');
      }
      
      const chatData = chatDoc.data() as Chat;
      const otherUserId = chatData.participants.find(id => id !== currentUser.uid);
      
      if (!otherUserId) {
        throw new Error('Kon andere gebruiker in de chat niet vinden');
      }
      
      // Update de chat met het laatste bericht
      const chatUpdate: Record<string, any> = {
        lastMessage: text,
        lastMessageTimestamp: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      
      // Update unreadCount voor de andere gebruiker
      if (typeof chatData.unreadCount === 'number') {
        // Als unreadCount een getal is (oude structuur), zet het om naar een object
        chatUpdate.unreadCount = {
          [currentUser.uid]: 0,
          [otherUserId]: (chatData.unreadCount || 0) + 1
        };
      } else {
        // Als unreadCount al een object is
        chatUpdate[`unreadCount.${otherUserId}`] = ((chatData.unreadCount as Record<string, number>)[otherUserId] || 0) + 1;
      }
      
      await updateDoc(doc(db, 'chats', chatId), chatUpdate);
    } catch (err) {
      console.error('Fout bij het verzenden van bericht:', err);
      throw new Error('Kon bericht niet verzenden. Probeer het later opnieuw.');
    }
  };

  // Functie om een nieuwe chat aan te maken
  const createNewChat = async (otherUserId: string) => {
    if (!currentUser) {
      throw new Error('Je moet ingelogd zijn om een chat te starten');
    }
    
    try {
      // Controleer of er al een chat bestaat tussen deze twee gebruikers
      const existingChatQuery = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', currentUser.uid)
      );
      
      const existingChatsSnapshot = await getDocs(existingChatQuery);
      const existingChat = existingChatsSnapshot.docs.find(doc => {
        const data = doc.data();
        return data.participants.includes(otherUserId);
      });
      
      if (existingChat) {
        // Als de chat al bestaat, gebruik die
        return existingChat.id;
      }
      
      // Maak nieuwe chat aan met nieuwe structuur
      const newChatRef = await addDoc(collection(db, 'chats'), {
        participants: [currentUser.uid, otherUserId],
        lastMessage: '', // Lege string voor nieuw aangemaakte chat
        lastMessageTimestamp: Timestamp.now(), // Huidige tijd als timestamp
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        unreadCount: {
          [currentUser.uid]: 0,
          [otherUserId]: 0
        }
      });
      
      return newChatRef.id;
    } catch (err) {
      console.error('Fout bij het aanmaken van een nieuwe chat:', err);
      throw new Error('Kon geen nieuwe chat starten. Probeer het later opnieuw.');
    }
  };

  // Functie om een actieve chat in te stellen
  const setActiveChatById = async (chatId: string) => {
    try {
      const chat = chats.find(c => c.id === chatId);
      
      if (chat) {
        setActiveChat(chat);
        // Markeer berichten als gelezen wanneer actieve chat wordt ingesteld
        await markChatAsRead(chatId);
      } else {
        // Chat bestaat niet in de state, probeer op te halen
        const chatDoc = await getDoc(doc(db, 'chats', chatId));
        
        if (!chatDoc.exists()) {
          throw new Error('Chat bestaat niet');
        }
        
        // Implementatie zou soortgelijk zijn aan de fetchChats functie
        // maar dan voor een enkele chat
        // ...
        
        setError('Chat kon niet worden gevonden.');
      }
    } catch (err) {
      console.error('Fout bij het instellen van actieve chat:', err);
      setError('Kon de chat niet openen. Probeer het later opnieuw.');
    }
  };

  // Functie om chat als gelezen te markeren
  const markChatAsRead = async (chatId: string) => {
    if (!currentUser) return;
    
    try {
      // Bepaal het juiste pad om te updaten op basis van de structuur
      const chatDoc = await getDoc(doc(db, 'chats', chatId));
      if (!chatDoc.exists()) return;
      
      const chatData = chatDoc.data() as Chat;
      
      if (typeof chatData.unreadCount === 'number') {
        // Als het een getal is, update naar 0
        await updateDoc(doc(db, 'chats', chatId), {
          unreadCount: 0
        });
      } else {
        // Als het een object is, update alleen de huidige gebruiker's entry
        await updateDoc(doc(db, 'chats', chatId), {
          [`unreadCount.${currentUser.uid}`]: 0
        });
      }
      
      // Update ongelezen berichten voor huidige gebruiker
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const q = query(
        messagesRef,
        where('senderId', '!=', currentUser.uid),
        where('read', '==', false)
      );
      
      const unreadMessagesSnapshot = await getDocs(q);
      
      // Update elk ongelezen bericht
      const batch = new Array<Promise<void>>();
      unreadMessagesSnapshot.docs.forEach(doc => {
        batch.push(
          updateDoc(doc.ref, { read: true })
        );
      });
      
      await Promise.all(batch);
    } catch (err) {
      console.error('Fout bij het markeren van berichten als gelezen:', err);
    }
  };

  // Functie om totaal aantal ongelezen berichten te krijgen
  const getUnreadCount = () => {
    if (!currentUser) return 0;
    
    return chats.reduce((total, chat) => {
      let chatUnreadCount = 0;
      
      // Controleer of unreadCount een getal of een object is
      if (typeof chat.unreadCount === 'number') {
        chatUnreadCount = chat.unreadCount;
      } else if (typeof chat.unreadCount === 'object' && chat.unreadCount !== null) {
        chatUnreadCount = chat.unreadCount[currentUser.uid] || 0;
      }
      
      return total + chatUnreadCount;
    }, 0);
  };

  const value = {
    chats,
    activeChat,
    messages,
    loadingChats,
    loadingMessages,
    error,
    sendMessage,
    createNewChat,
    setActiveChatById,
    markChatAsRead,
    getUnreadCount
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}; 