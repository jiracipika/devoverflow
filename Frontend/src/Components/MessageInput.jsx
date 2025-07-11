import React, { useState } from 'react'
import { useMessages } from '../context/MessageContext'
import attachment_icon from '../assets/Images/attach.png'

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { addMessage, addFile, currentChat } = useMessages();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() && !file) return;

    setUploading(true);

    try {
      if (file) {
        await addFile(file);
        setFile(null);
      }

      if (messageText.trim()) {
        const newMessage = {
          text: messageText,
          isSending: true,
          timestamp: new Date().toISOString(),
          chatId: currentChat?.id
        };
        addMessage(newMessage);
        setMessageText('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='h-[50px] bg-[white] p-[10px] flex items-center justify-between' alt='input'>
      <div className='flex items-center gap-[10px]'>
        <input 
          type="file" 
          id="file" 
          style={{display:"none"}} 
          onChange={handleFileChange}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />
        <label htmlFor="file" className='cursor-pointer'>
          <img className='h-[24px] w-[24px]' src={attachment_icon} alt="Attach" />
        </label>
        {file && (
          <div className='flex items-center gap-[5px] text-[#666]'>
            <span>{file.name}</span>
            <button 
              type="button" 
              onClick={() => setFile(null)}
              className='text-[#888] hover:text-[#333]'
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      <input 
        className='flex-1 border-none outline-none text-[#2f2d52] text-[18px] px-[10px]' 
        type="text" 
        placeholder='Type Something...'
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        disabled={uploading}
      />
      
      <button 
        type="submit"
        className='border-none px-[15px] py-2.5 text-[white] bg-[#8da4f1] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        disabled={!messageText.trim() && !file}
      >
        {uploading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

export default MessageInput
