import React, { useState } from 'react'
import { useMessages } from '../context/MessageContext'
import attachment_icon from '../assets/Images/attach.png'

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const { addMessage, currentChat } = useMessages();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      text: messageText,
      isSending: true,
      timestamp: new Date().toISOString(),
      chatId: currentChat?.id
    };

    addMessage(newMessage);
    setMessageText('');
  };

  return (
    <form onSubmit={handleSubmit} className='h-[50px] bg-[white] p-[10px] flex items-center justify-between' alt='input'>
      <input 
        className='w-[90%] border-none outline-none text-[#2f2d52] text-[18px]' 
        type="text" 
        placeholder='Type Something...'
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <div className='flex items-center gap-[10px]' alt='send'>
        <input type="file" id="file" style={{display:"none"}} onChange={(e) => handleFileUpload(e)} />
        <label htmlFor="file">
          <img className='h-[24px] cursor-pointer' src={attachment_icon} alt="Attach" />
        </label>
        <button 
          className='border-none px-[15px] py-2.5 text-[white] bg-[#8da4f1] cursor-pointer'
          type="submit"
          disabled={!messageText.trim()}
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageInput