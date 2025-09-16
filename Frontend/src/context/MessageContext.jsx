import React, { createContext, useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sanitizeInput } from '../utils/security';

// Rate limiting configuration
const RATE_LIMIT = {
  WINDOW_MS: 60000, // 1 minute
  MAX_REQUESTS: 30, // Max requests per window
};

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const requestTimestamps = useRef([]);

  // Check rate limit
  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.WINDOW_MS;
    
    // Remove old timestamps
    requestTimestamps.current = requestTimestamps.current.filter(
      timestamp => timestamp > windowStart
    );

    // Check if rate limit exceeded
    if (requestTimestamps.current.length >= RATE_LIMIT.MAX_REQUESTS) {
      const retryAfter = Math.ceil((requestTimestamps.current[0] + RATE_LIMIT.WINDOW_MS - now) / 1000);
      return {
        allowed: false,
        retryAfter,
        message: `Too many requests. Please try again in ${retryAfter} seconds.`
      };
    }

    // Add current request timestamp
    requestTimestamps.current.push(now);
    return { allowed: true };
  }, []);

  // Validate message data
  const validateMessage = useCallback((message) => {
    if (!message) {
      return { isValid: false, error: 'Message is required' };
    }

    // Sanitize and validate text content if present
    if (message.text) {
      if (typeof message.text !== 'string') {
        return { isValid: false, error: 'Invalid message format' };
      }
      
      // Sanitize the message text
      message.text = sanitizeInput(message.text);
      
      // Check message length
      if (message.text.length > 2000) {
        return { isValid: false, error: 'Message is too long (max 2000 characters)' };
      }
    }

    // Validate file if present
    if (message.file) {
      if (typeof message.file !== 'object' || message.file === null) {
        return { isValid: false, error: 'Invalid file format' };
      }
    }

    return { isValid: true };
  }, []);

  const addMessage = useCallback((message) => {
    // Check rate limit
    const rateLimit = checkRateLimit();
    if (!rateLimit.allowed) {
      throw new Error(rateLimit.message);
    }

    // Validate message
    const validation = validateMessage(message);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Add message with unique ID and timestamp if not provided
    const newMessage = {
      id: message.id || uuidv4(),
      ...message,
      timestamp: message.timestamp || new Date().toISOString(),
      isSending: message.isSending ?? false,
      chatId: message.chatId || currentChat?.id
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, [checkRateLimit, validateMessage, currentChat?.id]);

  const addFile = useCallback(async (file, tempMessageId = null) => {
    try {
      // Check rate limit
      const rateLimit = checkRateLimit();
      if (!rateLimit.allowed) {
        throw new Error(rateLimit.message);
      }

      const reader = new FileReader();
      const fileData = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const fileMessage = {
        id: tempMessageId || uuidv4(),
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
        isSending: true
      };

      // Validate the file message
      const validation = validateMessage(fileMessage);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

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
              ? { 
                  ...msg, 
                  error: error.message || 'Failed to upload file', 
                  isSending: false 
                }
              : msg
          )
        );
      }
      
      throw error;
    }
  }, [addMessage, checkRateLimit, currentChat?.id, validateMessage]);

  const updateChats = useCallback((chat) => {
    if (!chat || typeof chat !== 'object') {
      console.error('Invalid chat object provided');
      return;
    }

    setChats(prev => {
      const existingChatIndex = prev.findIndex(c => c.id === chat.id);
      if (existingChatIndex !== -1) {
        const updatedChats = [...prev];
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          ...chat,
          updatedAt: new Date().toISOString()
        };
        return updatedChats;
      }
      return [...prev, { ...chat, createdAt: new Date().toISOString() }];
    });
  }, []);

  // Cleanup function for file URLs
  const cleanupFileUrls = useCallback(() => {
    messages.forEach(message => {
      if (message.file?.preview && message.file.preview.startsWith('blob:')) {
        URL.revokeObjectURL(message.file.preview);
      }
    });
  }, [messages]);

  // Add cleanup on unmount
  React.useEffect(() => {
    return () => {
      cleanupFileUrls();
    };
  }, [cleanupFileUrls]);

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

export const useMessages = () => {
  const context = React.useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
