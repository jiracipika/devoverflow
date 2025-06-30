import React, { useState, useEffect } from 'react'
import FollowSuggestionCard from './FollowSuggestionCard'
import Tag from './Tag'
import UserDataInfo from '../assets/UserData'

const Footer = () => {
  const [randomSelectedUsers, setRandomSelectedUsers] = useState([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const allUsers = [...UserDataInfo]

    // Shuffle using Fisher-Yates Algorithm
    for (let i = allUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allUsers[i], allUsers[j]] = [allUsers[j], allUsers[i]]
    }

    setRandomSelectedUsers(allUsers.slice(0, isMobile ? 2 : 4))
  }, [isMobile])
  
  if (isMobile) {
    return (
      <footer className='fixed bottom-0 left-0 w-full bg-[#0A0B10] border-t border-gray-800 p-4 z-10'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2 overflow-x-auto pb-2 hide-scrollbar'>
            {randomSelectedUsers.map((user) => (
              <div key={user.id} className='flex-shrink-0 w-10 h-10'>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className='w-full h-full rounded-full object-cover'
                />
              </div>
            ))}
          </div>
          <div className='flex space-x-4'>
            <Tag text="About" className="text-gray-200 hover:text-white" />
            <Tag text="Contact" className="text-gray-200 hover:text-white" />
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className='hidden md:flex flex-col justify-between p-4 gap-6 h-screen w-[330px] fixed top-0 right-0 bg-[#0A0B10] overflow-y-auto text-gray-200'>
      <div className='mt-24'>
        <h3 className='text-lg font-semibold mb-4 text-white'>Who to follow</h3>
        <div className='flex flex-col gap-4'>
          {randomSelectedUsers.map((user) => (
            <FollowSuggestionCard key={user.id} {...user} />
          ))}
        </div>
      </div>

      <div className='mb-8'>
        <div className='grid grid-cols-2 gap-4'>
          <Tag classnames='col-span-2 text-gray-200 hover:text-white' text='About Us' />
          <Tag text='Contact Us' className="text-gray-200 hover:text-white" />
          <Tag text='Policy' className="text-gray-200 hover:text-white" />
          <Tag classnames='col-span-2 text-xs text-gray-400' text=' 2025 Networking Tool. All rights reserved.' />
        </div>
      </div>
    </footer>
  )
}

export default Footer