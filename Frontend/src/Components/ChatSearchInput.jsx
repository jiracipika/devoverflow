import React from 'react'
import { FaMagnifyingGlass, FaMoon } from 'react-icons/fa6'

const ChatSearchInput = () => {
  return (
    <div className='border-b-[gray] border-b border-solid' alt='search'>
        <div className='flex' alt='searchForm'>
            <FaMagnifyingGlass className='text-[#7B8EC8]  h-[24px] w-[24px]' />
            <input className='bg-[transparent] text-[white] border-[none]' type="text" placeholder='Search User'/>
        </div>
        <div className='p-[10px] flex items-center gap-[10px] text-[white] cursor-pointer hover:bg-[#2f2d52]' alt='userChat'>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src="" alt="" />
            <div alt='userChatInfo'>
                <span>Jane</span>
            </div>
        </div>
    </div>
  )
}

export default ChatSearchInput