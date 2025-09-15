import React, { createContext, useState, useContext } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const addFile = async (file, tempMessageId = null) => {
    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const fileMessage = {
        id: tempMessageId || Date.now().toString(),
        type: 'file',
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          data: fileData,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          isUploading: false
        },
        timestamp: new Date().toISOString(),
        chatId: currentChat?.id,
        isSending: false
      };

      if (tempMessageId) {
        // Update existing message with file data
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempMessageId 
              ? { ...msg, ...fileMessage, isSending: false }
              : msg
          )
        );
      } else {
        // Add new message if no temp ID provided (fallback)
        addMessage(fileMessage);
      }

      return fileMessage;
    } catch (error) {
      console.error('Error adding file:', error);
      
      // Update the message to show error state if it was a preview
      if (tempMessageId) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempMessageId 
              ? { ...msg, error: 'Failed to upload file', isSending: false }
              : msg
          )
        );
      }
      
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
