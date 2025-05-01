import React from 'react'

const MessageBox = ({text, isReceiving}) => {
  
  return (
    <div className={`flex gap-[20px] mb-5 ${isReceiving ? 'flex-row-reverse' : ''}`} alt='message'>
        <div className='flex flex-col text-[gray] font-[300]' alt='messageInfo'>
            <img className='w-[40px] h-[40px] rounded-[50%] object-cover' src="" alt="" />
            <span>Just Now</span>
        </div>
        <div className={`max-w-[80%] flex flex-col gap-[10px] ${isReceiving ? 'items-end' : ''}`} alt='messageContent'>
            <p className={`bg-[white] px-5 py-2.5 rounded-[0px_10px_10px_10px] max-w-max ${isReceiving ? 'bg-[#8da4fa] text-[white] rounded-[10px_0px_10px_10px]' : ''}`}>{text}</p>
            <img className='w-[50%]' src="" alt="" />
        </div>
    </div>
  )
}

export default MessageBox