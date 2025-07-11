import React from 'react'
import { useMessages } from '../context/MessageContext'
import MessageBox from './MessageBox'

const MessageBoxes = () => {
  const { messages } = useMessages();

  return (
    <div className='bg-[#ddddf7] h-[calc(100%_-_100px)] overflow-scroll p-[5px]' alt='messages'>
      {messages.map((message, index) => (
        <MessageBox 
          key={index}
          text={message.text}
          isSending={message.isSending}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  )
}

export default MessageBoxes
