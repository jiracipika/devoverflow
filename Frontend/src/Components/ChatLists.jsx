import React from 'react'

const ChatLists = () => {
  return (
    <div alt='chats'>
        <div className='p-[10px] flex items-center gap-[10px] text-[white] cursor-pointer hover:bg-[#2f2d52]' alt='userChat'>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src="" alt="" />
            <div alt='userChatInfo'>
                <span className='text-[18px] font-[500]'>Jane</span>
                <p className='text-[14px] text-[lightgray]'>Hello</p>
            </div>
        </div>
        <div className='p-[10px] flex items-center gap-[10px] text-[white] cursor-pointer hover:bg-[#2f2d52]' alt='userChat'>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src="" alt="" />
            <div alt='userChatInfo'>
                <span className='text-[18px] font-[500]'>Jane</span>
                <p className='text-[14px] text-[lightgray]'>Hello</p>
            </div>
        </div>
        <div className='p-[10px] flex items-center gap-[10px] text-[white] cursor-pointer hover:bg-[#2f2d52]' alt='userChat'>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src="" alt="" />
            <div alt='userChatInfo'>
                <span className='text-[18px] font-[500]'>Jane</span>
                <p className='text-[14px] text-[lightgray]'>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default ChatLists