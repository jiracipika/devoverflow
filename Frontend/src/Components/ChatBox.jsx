import React, { useState, useEffect } from 'react'
import { useMessages } from '../context/MessageContext'
import add_friend from '../assets/Images/add-friend.png'
import more_icon from '../assets/Images/more.png'
import MessageBoxes from './MessageBoxes'
import MessageInput from './MessageInput'
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';
import axios from 'axios';

const ChatBox = ({ onToggleSidebar }) => {
  const { currentChat, chats, updateChats } = useMessages();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoreMenu) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMoreMenu]);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowMoreMenu(!showMoreMenu);
  };

  const handleFollow = async () => {
    if (!currentChat) {
      toast.error('Please select a chat first');
      return;
    }

    setIsLoading(true);
    const newFollowState = !isFollowing;

    // Add your add friend logic here
    try {
                
      // Make API call to update follow status
      await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
        status: newFollowState ? 'Followed' : 'Unfollowed'
      });

      // Toggle follow state
      setIsFollowing(newFollowState);
      toast.success(`Successfully ${newFollowState ? 'followed' : 'unfollowed'} ${currentChat.name}`);
      } catch (error) {
        // Revert state on error
        setIsFollowing(!isFollowing);
        console.error('Error updating follow status:', error);
        toast.error(`Failed to ${newFollowState ? 'follow' : 'unfollow'}. Please try again.`);
      } finally {
        setIsLoading(false)
      }
  }

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
    <div className='w-full lg:w-[80%] flex-1 flex flex-col' aria-live="polite">
      <div className='h-[60px] bg-[#5d5b8d] flex items-center justify-between p-4 text-[lightgray] shadow-md' alt='chatInfo'>
        <FaArrowLeft 
          className='hidden max-[767px]:flex cursor-pointer hover:text-white transition-colors' 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        />
        <h2 className='font-medium text-lg'>{currentChat?.name || 'No chat selected'}</h2>
        <div className='flex gap-[15px]' alt='chatIcons'>
        <button 
            className={`p-1 rounded-full hover:bg-[#6d6a9e] transition-colors ${isFollowing ? 'text-green-400' : ''}`}
            onClick={handleFollow}
            disabled={isLoading}
            aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
            title={isFollowing ? 'Unfollow' : 'Follow'}
          >
            <img 
              className='h-6 w-6' 
              src={add_friend} 
              alt={isFollowing ? 'Unfollow' : 'Follow'} 
            />
          </button>
          <div className='relative'>
            <button 
              className='p-1 rounded-full hover:bg-[#6d6a9e] transition-colors'
              onClick={handleMoreClick}
              aria-label="More options"
              aria-expanded={showMoreMenu}
              aria-haspopup="true"
            >
              <img 
                className='h-6 w-6' 
                src={more_icon} 
                alt="More options" 
              />
            </button>
            {showMoreMenu && (
              <div 
              className='absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200'
              role="menu"
              aria-orientation="vertical"
              >
                <button 
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'
                  onClick={() => handleOptionClick('pin_chat')}
                  role="menuitem"
                >
                  {currentChat?.pinned ? (
                    <>
                      <span>Unpin Chat</span>
                      <span className="ml-auto">📌</span>
                    </>
                  ) : 'Pin Chat'}
                </button>
                <button
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2'
                  onClick={() => handleOptionClick('mark_read')}
                  role="menuitem"
                >
                  Mark as Read
                </button>

                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                  onClick={() => handleOptionClick('delete_chat')}
                  role="menuitem"
                >
                  <span>Delete Chat</span>
                </button>
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

export default React.memo(ChatBox)