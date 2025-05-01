import React from 'react'
import audio_call from '../assets/Images/telecommunication.png'
import video_call from '../assets/Images/video.png'
import add_friend from '../assets/Images/add-friend.png'
import more_icon from '../assets/Images/more.png'
import MessageBoxes from './MessageBoxes'
import MessageInput from './MessageInput'

const ChatBox = () => {
  return (
    <div className='w-[80%] flex-2' alt='chat'>
      <div className='h-[50px] bg-[#5d5b8d] flex items-center justify-between p-[10px] text-[lightgray]' alt='chatInfo'>
        <span>Jane</span>
        <div className='flex gap-[15px]' alt='chatIcons'>
          <img className='h-[24px] cursor-pointer' src={audio_call} alt="" />
          <img className='h-[24px] cursor-pointer' src={video_call} alt="" />
          <img className='h-[24px] cursor-pointer' src={add_friend} alt="" />
          <img className='h-[24px] cursor-pointer' src={more_icon} alt="" />
        </div>
      </div>
      <MessageBoxes/>
      <MessageInput/>
    </div>
  )
}

export default ChatBox