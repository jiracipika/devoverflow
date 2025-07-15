import React from 'react'
import ChatSearchInput from './ChatSearchInput'
import ChatLists from './ChatLists'

const ChatSideBar = () => {
  return (
    <div className='flex border-r-[#3e3c61] border-r border-solid bg-[#3e3c61] '>
      <ChatSearchInput/>
      <ChatLists/>
    </div>
  )
}

export default ChatSideBar