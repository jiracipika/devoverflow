import React, { useState } from 'react'
import { useMessages } from '../context/MessageContext'
import audio_call from '../assets/Images/telecommunication.png'
import video_call from '../assets/Images/video.png'
import add_friend from '../assets/Images/add-friend.png'
import more_icon from '../assets/Images/more.png'
import MessageBoxes from './MessageBoxes'
import MessageInput from './MessageInput'
import { FaArrowLeft } from "react-icons/fa6";

const ChatBox = ({ onToggleSidebar, showSidebar }) => {
  const { currentChat, chats, updateChats } = useMessages();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowMoreMenu(!showMoreMenu);
  };

  const handleOptionClick = (option) => {
    setShowMoreMenu(false);
    
    switch (option) {
      case 'pin_chat':
        // Pin/unpin chat
        if (currentChat) {
          const updatedChat = {
            ...currentChat,
            pinned: !currentChat.pinned
          };
          updateChats(updatedChat);
        }
        break;
      case 'mark_read':
        // Mark all messages as read
        if (currentChat) {
          const updatedChat = {
            ...currentChat,
            unreadCount: 0
          };
          updateChats(updatedChat);
        }
        break;
      case 'delete_chat':
        // Delete chat
        if (window.confirm('Are you sure you want to delete this chat?')) {
          const updatedChats = chats.filter(chat => chat.id !== currentChat?.id);
          updateChats(updatedChats[0] || null);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className='w-full lg:w-[80%] flex-2' alt='chat'>
      <div className='h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-[lightgray]' alt='chatInfo'>
        <FaArrowLeft 
          className='hidden max-[767px]:flex cursor-pointer' 
          onClick={onToggleSidebar}
        />
        <span>{currentChat?.name || 'No chat selected'}</span>
        <div className='flex gap-[15px]' alt='chatIcons'>
          <img 
            className='h-[24px] cursor-pointer hover:opacity-70 transition-opacity' 
            src={add_friend} 
            alt="Add Friend" 
            onClick={() => {
              if (!currentChat) {
                alert('Please select a chat first');
                return;
              }
              console.log('Add friend clicked for:', currentChat.name);
              // Add your add friend logic here
            }}
          />
          <div className='relative'>
            <img 
              className='h-[24px] cursor-pointer hover:opacity-70 transition-opacity' 
              src={more_icon} 
              alt="More" 
              onClick={handleMoreClick}
            />
            {showMoreMenu && (
              <div className='absolute right-0 top-full mt-2 w-[200px] bg-white rounded-md shadow-lg py-2 z-50'>
                <div 
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleOptionClick('pin_chat')}
                >
                  {currentChat?.pinned ? 'Unpin Chat' : 'Pin Chat'}
                </div>
                <div 
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleOptionClick('mark_read')}
                >
                  Mark as Read
                </div>
                <div 
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500'
                  onClick={() => handleOptionClick('delete_chat')}
                >
                  Delete Chat
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MessageBoxes/>
      <MessageInput/>
    </div>
  )
}

export default ChatBox