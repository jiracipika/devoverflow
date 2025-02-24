import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='p-10 bg-[#C6D3E7]'>
        <ul className="flex justify-around">
            <li><Link className='font-bold text-xl' to="/profile">Profile</Link></li>
            <li><Link className='font-bold text-xl' to="/notification">Notification</Link></li>
            <li><Link className='font-bold text-xl' to="/messages">Messages</Link></li>
            <li><Link className='font-bold text-xl' to="/schedule">Schedule</Link></li>
            <li><Link className='font-bold text-xl' to="/">Home</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar