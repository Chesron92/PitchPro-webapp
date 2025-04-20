import React, { createContext, useState, useContext } from 'react';

export interface Message {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface MessageContextType {
  messages: Message[];
  addMessage: (text: string, type: Message['type']) => void;
  removeMessage: (id: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage moet binnen een MessageProvider gebruikt worden');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, type: Message['type'] = 'info') => {
    const id = Date.now().toString();
    
    setMessages(prevMessages => [...prevMessages, { id, text, type }]);
    
    // Automatisch verwijderen na 5 seconden
    setTimeout(() => {
      removeMessage(id);
    }, 5000);
  };

  const removeMessage = (id: string) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  const value = {
    messages,
    addMessage,
    removeMessage
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

export default MessageContext; 