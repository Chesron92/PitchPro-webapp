import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
  read: boolean;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastTimestamp?: any;
  unreadCount?: number;
}

export const useMessages = () => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Haal alle chats op voor de huidige gebruiker
  useEffect(() => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, where('participants', 'array-contains', currentUser.uid));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Chat[];
        
        setChats(chatsList);
        setLoading(false);
      }, (err) => {
        setError('Fout bij het ophalen van chats: ' + err.message);
        setLoading(false);
      });
      
      return unsubscribe;
    } catch (err: any) {
      setError('Fout bij het instellen van chat-listener: ' + err.message);
      setLoading(false);
    }
  }, [currentUser]);

  // Haal berichten op voor de actieve chat
  useEffect(() => {
    if (!activeChat || !currentUser) return;
    
    setLoading(true);
    try {
      const messagesRef = collection(db, 'chats', activeChat, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        
        setMessages(messagesList);
        setLoading(false);
      }, (err) => {
        setError('Fout bij het ophalen van berichten: ' + err.message);
        setLoading(false);
      });
      
      return unsubscribe;
    } catch (err: any) {
      setError('Fout bij het instellen van berichten-listener: ' + err.message);
      setLoading(false);
    }
  }, [activeChat, currentUser]);

  // Functie om een nieuw bericht te sturen
  const sendMessage = async (text: string) => {
    if (!activeChat || !currentUser || !text.trim()) return;
    
    try {
      const messagesRef = collection(db, 'chats', activeChat, 'messages');
      await addDoc(messagesRef, {
        text,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        read: false
      });
      
      // Update de laatste bericht info in de chat
      // Dit zou in een Cloud Function moeten gebeuren voor een echte app
    } catch (err: any) {
      setError('Fout bij het verzenden van bericht: ' + err.message);
    }
  };

  // Functie om een nieuwe chat te starten
  const createChat = async (recipientId: string) => {
    if (!currentUser || recipientId === currentUser.uid) return;
    
    try {
      // Controleer eerst of er al een chat bestaat met deze gebruiker
      const existingChat = chats.find(chat => 
        chat.participants.includes(recipientId) && chat.participants.length === 2
      );
      
      if (existingChat) {
        setActiveChat(existingChat.id);
        return existingChat.id;
      }
      
      // Maak een nieuwe chat
      const chatRef = collection(db, 'chats');
      const newChat = await addDoc(chatRef, {
        participants: [currentUser.uid, recipientId],
        createdAt: serverTimestamp()
      });
      
      setActiveChat(newChat.id);
      return newChat.id;
    } catch (err: any) {
      setError('Fout bij het aanmaken van chat: ' + err.message);
      return null;
    }
  };

  return {
    chats,
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    createChat,
    loading,
    error
  };
}; 