import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const addFile = async (file) => {
    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const message = {
        type: 'file',
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          data: fileData,
          preview: URL.createObjectURL(file)
        },
        timestamp: new Date().toISOString(),
        chatId: currentChat?.id
      };

      addMessage(message);
      return message;
    } catch (error) {
      console.error('Error adding file:', error);
      throw error;
    }
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
        addFile,
        setCurrentChat,
        updateChats
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
