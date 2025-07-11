import React from 'react'
import { useMessages } from '../context/MessageContext'

const ChatLists = () => {
  const { chats, setCurrentChat } = useMessages()

  // Sort chats by last message timestamp (newest first)
  const sortedChats = [...chats].sort((a, b) => 
    new Date(b.lastMessage?.timestamp || 0) - new Date(a.lastMessage?.timestamp || 0)
  )

  const handleChatClick = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <div className='flex-1 overflow-y-auto p-[10px]'>
      {sortedChats.map((chat) => (
        <div 
          key={chat.id}
          className='flex items-center gap-[10px] text-[#7B8EC8] cursor-pointer hover:bg-[#2f2d52] transition-colors duration-200 p-[10px] rounded-md mb-[5px]'
          onClick={() => handleChatClick(chat)}
        >
          <img 
            className='w-[50px] h-[50px] rounded-[50%] object-cover' 
            src={chat.avatar || ''} 
            alt={chat.name}
          />
          <div className='flex flex-col flex-1'>
            <div className='flex justify-between items-center'>
              <span className='text-[18px] font-[500]'>{chat.name}</span>
              <span className='text-[14px] text-[#7B8EC8]'>
                {chat.lastMessage?.timestamp ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() : ''}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-[14px] text-[#7B8EC8] truncate'>
                {chat.lastMessage?.text || 'No messages yet'}
              </p>
              {chat.unreadCount > 0 && (
                <span className='bg-[#8aadf4] text-[white] px-[8px] py-[2px] rounded-full text-[12px]'>
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatLists
