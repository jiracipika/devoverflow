import React from 'react'
import SearchInput from '../Components/SearchInput';
import ChatBox from '../Components/ChatBox';
import ChatSideBar from '../Components/ChatSideBar';

const Messages = () => {
  return (
    <div className='w-full h-[90vh] flex bg-[#0F1117]' alt='Background'>
        <div className='w-[90%] h-[80%] rounded-[10px] flex overflow-hidden' alt='Container'>
          <ChatSideBar/>
          <ChatBox/>
        </div>
    </div>
  )
}

export default Messages