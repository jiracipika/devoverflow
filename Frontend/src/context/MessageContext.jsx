import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const updateChats = (chat) => {
    setChats(prev => {
      const existingChatIndex = prev.findIndex(c => c.id === chat.id);
      if (existingChatIndex !== -1) {
        const updatedChats = [...prev];
        updatedChats[existingChatIndex] = chat;
        return updatedChats;
      }
      return [...prev, chat];
    });
  };

  return (
    <MessageContext.Provider 
      value={{
        messages,
        currentChat,
        chats,
        addMessage,
        setCurrentChat,
        updateChats
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
