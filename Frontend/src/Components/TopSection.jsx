import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'
import { FaMagnifyingGlass, FaMoon, FaBars } from 'react-icons/fa6'
import NotifIcon from '../assets/Images/icons8-notification-48.png'

const Searchbar = () => {
  const [query, setQuery] = useState("")
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)

  const handleSearch = (userquery) =>{
    setQuery(userquery)
  }

  const toggleDropdown = () => {
    setIsDropdownOpened(!isDropdownOpened)
  }

  const closeDropdown = () => {
    setIsDropdownOpened(false)
  }
  

  return (
    <div className={`bg-[#0A0B10] z-10 w-[calc(100%-266px)] fixed top-0 h-[100px] text-white flex justify-around items-center `}>
      
      
    <SearchInput onSearchChange={handleSearch} placeholderText={"Search anything globally"} classNames={"w-[566px]"}/>
      <div className='flex items-center gap-4'>
        <FaMoon className='max-lg:hidden text-[#ff7000] rotate-[-90deg] w-[24px] h-[24px]' />
        <Link to={"notifications"}><img className='max-lg:hidden rounded-full w-[42px] h-[42px]' src={NotifIcon}></img></Link>
        <Link to={"profile"}><img className='max-lg:hidden rounded-full w-[42px] h-[42px]' src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/4JkBtVU9QUwcwFCWi3AV" alt="" /></Link>
        <FaBars onClick={toggleDropdown} className='hidden max-lg:flex hover:border-primary cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2'/>
        {isDropdownOpened && (
          <div 
          className="absolute right-0 top-[100px] bg-[#0A0B10] w-[200px] rounded-lg shadow-lg py-2 z-50"
          onClick={closeDropdown}
        >
          <Link 
            to="/notifications" 
            className="block px-4 py-2 hover:bg-[#1A1B20] transition-colors"
            onClick={closeDropdown}
          >
            Notifications
          </Link>
          <Link 
            to="/profile" 
            className="block px-4 py-2 hover:bg-[#1A1B20] transition-colors"
            onClick={closeDropdown}
          >
            Profile
          </Link>
          <Link 
            to="/settings" 
            className="block px-4 py-2 hover:bg-[#1A1B20] transition-colors"
            onClick={closeDropdown}
          >
            Settings
          </Link>
        </div>
        )}
      </div>
        
    </div>
  )
}

export default Searchbar

