import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessages } from '../contexts/MessageContext';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/common/Spinner';

const Conversation: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    activeChat,
    messages,
    loadingMessages,
    error,
    sendMessage,
    setActiveChatById,
    markChatAsRead
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
  
  // Stel actieve chat in als conversationId is opgegeven
  useEffect(() => {
    if (conversationId) {
      setActiveChatById(conversationId);
      // Markeer berichten als gelezen wanneer de conversatie wordt geopend
      markChatAsRead(conversationId);
    }
  }, [conversationId, setActiveChatById, markChatAsRead]);
  
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
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeChat || !conversationId) return;
    
    // Bewaar het bericht tijdelijk
    const messageToSend = newMessage.trim();
    
    // Leeg het veld onmiddellijk (voor betere gebruikservaring)
    setNewMessage('');
    
    try {
      // Verstuur het bewaarde bericht
      await sendMessage(conversationId, messageToSend);
    } catch (err) {
      console.error('Fout bij het versturen van bericht:', err);
      // Als er een fout optreedt, herstel het bericht in het veld
      setNewMessage(messageToSend);
    }
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto min-h-[70vh] flex flex-col">
          {!conversationId || !activeChat ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Berichtenkop */}
              <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
                <button 
                  onClick={() => navigate('/messages')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[calc(70vh-8rem)]">
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
                    type="text"
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Typ een bericht..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversation; 