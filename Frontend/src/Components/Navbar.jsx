import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaPeopleGroup, FaHouse, FaStar, FaRightFromBracket, FaTag, FaQuestion } from 'react-icons/fa6'


const Navbar = () => {
  return (
    <nav className='text-white py-10 px-4 min-h-screen flex flex-col justify-between z-10 fixed top-0 max-h-full w-[266px] bg-[#0B0C14]'>
      <div className='flex flex-col w-full gap-8 '>
        <h1 className='px-4 py-2.5 text-[18px]'>Logo</h1>
        <ul className='flex flex-col gap-4 w-full '>
          <NavLink to={"/"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaHouse /></span>Home</NavLink>
          <NavLink to={"/collections"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaStar /></span>Collections</NavLink>
          <NavLink to={"/tags"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaTag /></span>Tags</NavLink>
          <NavLink to={"/communities"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaPeopleGroup /></span>Communities</NavLink>
          <NavLink to={"/ask-a-question"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaQuestion /></span>Ask a Question</NavLink>
          
        </ul>

      </div>


      <Link className="px-4 py-2.5 gap-2 flex items-center text-[18px]"><span className='flex items-center'><FaRightFromBracket /></span> LogOut</Link>

    </nav>
  )
}

export default Navbar