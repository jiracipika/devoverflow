import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaMagnifyingGlass, FaHouse, FaStar, FaRightFromBracket } from 'react-icons/fa6'


const Navbar = () => {
  return (
    <nav className='text-white py-10 px-4 min-h-screen flex flex-col justify-between z-10 fixed top-0 max-h-full w-[266px] bg-[#0B0C14]'>
      <div className='flex flex-col w-full gap-8 '>
        <h1 className='px-4 py-2.5 text-[18px]'>Logo</h1>
        <ul className='flex flex-col gap-4 w-full '>
          <NavLink to={"/"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaHouse /></span>Home</NavLink>
          <NavLink to={"/collections"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaStar /></span>Collections</NavLink>
          <NavLink to={"/jobs"} className={({ isActive }) => `flex transition-all text-[18px] px-4 py-2.5 rounded-lg w-full font-normal gap-2 items-center ${isActive ? "bg-custom-gradient" : ""}`}><span><FaStar /></span>Find Jobs</NavLink>
          <NavLink to={"/tags"} className={`flex text-[18px] transition-all font-normal gap-2 px-4 py-2.5 rounded-lg w-full items-center`}><span><FaStar /></span>Tags</NavLink>
          <NavLink to={"/communities"} className={`flex text-[18px] transition-all font-normal gap-2 px-4 py-2.5 rounded-lg w-full items-center`}><span><FaStar /></span>Communities</NavLink>
          <NavLink to={"/question"} className={`flex text-[18px] transition-all font-normal gap-2 px-4 py-2.5 rounded-lg w-full items-center`}><span><FaStar /></span>Ask a Question</NavLink>
          <NavLink to={"/blog"} className={`flex text-[18px] transition-all font-normal gap-2 px-4 py-2.5 rounded-lg w-full items-center`}><span><FaStar /></span>Blog</NavLink>
          <NavLink to={"/recommended-q"} className={`flex text-[18px] transition-all font-normal gap-2 px-4 py-2.5 rounded-lg w-full items-center`}><span><FaStar /></span>Recommended Qs</NavLink>
        </ul>

      </div>


      <Link className="px-4 py-2.5 gap-2 flex items-center text-[18px]"><span className='flex items-center'><FaRightFromBracket /></span> LogOut</Link>

    </nav>
  )
}

export default Navbar