import React from 'react'
import MessageBox from './MessageBox'

const MessageBoxes = () => {
  return (
    <div className='bg-[#ddddf7] h-[calc(100%_-_100px)] overflow-scroll p-[5px]' alt='messages'>
        <MessageBox text={"Hello"}/>
        <MessageBox text={"Hello"} isSending={true}/>
    </div>
  )
}

export default MessageBoxes