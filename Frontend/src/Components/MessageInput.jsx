import React from 'react'
import attachment_icon from '../assets/Images/attach.png'
import image_icon from '../assets/Images/photo.png'

const MessageInput = () => {
  return (
    <div className='h-[50px] bg-[white] p-[10px] flex items-center justify-between' alt='input'>
        <input className='w-[100%] border-none outline-none text-[#2f2d52] text-[18px]' type="text" placeholder='Type Something...' />
        <div className='flex items-center gap-[10px]' alt='send'>
            <img className='h-[24px] cursor-pointer' src={attachment_icon} alt="" />
            <input type="text" style={{display:"none"}} id="file"/>
            <label htmlFor="file">
                <img className='h-[24px] cursor-pointer' src={image_icon} alt="" />
            </label>
            <button className='border-none px-[15px] py-2.5 text-[white] bg-[#8da4f1] cursor-pointer'>Send</button>
        </div>
    </div>
  )
}

export default MessageInput