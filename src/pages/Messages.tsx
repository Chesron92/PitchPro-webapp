import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessages } from '../contexts/MessageContext';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/common/Spinner';

const Messages: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    chats,
    activeChat,
    messages,
    loadingChats,
    loadingMessages,
    error,
    sendMessage,
    setActiveChatById,
  } = useMessages();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Redirect naar login als gebruiker niet is ingelogd
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  // Stel actieve chat in als chatId is opgegeven
  useEffect(() => {
    if (chatId) {
      setActiveChatById(chatId);
    }
  }, [chatId, setActiveChatById]);
  
  // Scroll naar het laatste bericht als er nieuwe berichten zijn
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus op het inputveld na het versturen van een bericht
  useEffect(() => {
    if (activeChat) {
      inputRef.current?.focus();
    }
  }, [messages.length, activeChat]);
  
  if (loadingChats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeChat) return;
    
    // Bewaar het bericht tijdelijk
    const messageToSend = newMessage.trim();
    
    // Leeg het veld onmiddellijk (voor betere gebruikservaring)
    setNewMessage('');
    
    try {
      // Verstuur het bewaarde bericht
      await sendMessage(activeChat.id, messageToSend);
    } catch (err) {
      console.error('Fout bij het versturen van bericht:', err);
      // Als er een fout optreedt, herstel het bericht in het veld
      setNewMessage(messageToSend);
    }
  };
  
  const handleChatSelect = (chatId: string) => {
    navigate(`/messages/${chatId}`);
  };
  
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Gisteren';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Berichten</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-lg overflow-hidden min-h-[70vh]">
        {/* Lijst van chats */}
        <div className="md:w-1/3 border-r">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-lg">Gesprekken</h2>
          </div>
          
          <div className="overflow-y-auto h-[calc(70vh-4rem)]">
            {chats.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Geen berichten gevonden. Start een gesprek via het profiel van een kandidaat of recruiter.
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    activeChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {chat.otherUser.photoURL ? (
                        <img
                          src={chat.otherUser.photoURL}
                          alt={chat.otherUser.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600">
                          {chat.otherUser.displayName.substring(0, 1).toUpperCase()}
                        </div>
                      )}
                      {typeof chat.unreadCount === 'number' ? (
                        chat.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unreadCount}
                          </span>
                        )
                      ) : (
                        (chat.unreadCount?.[currentUser?.uid || ''] || 0) > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {chat.unreadCount?.[currentUser?.uid || ''] || 0}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{chat.otherUser.displayName}</h3>
                        {chat.lastMessageTimestamp && (
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(chat.lastMessageTimestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage ? chat.lastMessage : 'Geen berichten'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Berichtenvenster */}
        <div className="md:w-2/3 flex flex-col">
          {activeChat ? (
            <>
              {/* Berichtenkop */}
              <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
                {activeChat.otherUser.photoURL ? (
                  <img
                    src={activeChat.otherUser.photoURL}
                    alt={activeChat.otherUser.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-md font-medium text-gray-600">
                    {activeChat.otherUser.displayName.substring(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{activeChat.otherUser.displayName}</h2>
                  <p className="text-sm text-gray-500">{activeChat.otherUser.role}</p>
                </div>
              </div>
              
              {/* Berichten */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(70vh-12rem)]">
                {loadingMessages ? (
                  <div className="flex justify-center items-center h-full">
                    <Spinner />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    Geen berichten. Stuur een bericht om het gesprek te starten.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === currentUser?.uid
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.senderId === currentUser?.uid ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                          {message.senderId === currentUser?.uid && (
                            <span className="ml-1">
                              {message.read ? ' • Gelezen' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Berichteninvoer */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Typ een bericht..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">Geen actief gesprek</h3>
              <p>Selecteer een gesprek in de lijst links om berichten weer te geven.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 