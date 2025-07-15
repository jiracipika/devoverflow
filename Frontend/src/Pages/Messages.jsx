import React, { useState } from 'react'
import { MessageProvider } from '../context/MessageContext'
import ChatBox from '../Components/ChatBox';
import ChatSideBar from '../Components/ChatSideBar';

const Messages = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 767);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <MessageProvider>
      <div className='w-full lg:w-[calc(100%-330px)] h-[90vh] flex bg-[#0F1117]' alt='Background'>
        <div className='w-full lg:w-[90%] h-[80%] max-[767px]:h-[90%] rounded-[10px] flex overflow-hidden' alt='Container'>
          {showSidebar && <ChatSideBar onClose={() => setShowSidebar(false)} />}
          <ChatBox onToggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        </div>
      </div>
    </MessageProvider>
  )
}

export default Messages