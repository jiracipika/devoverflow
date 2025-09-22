import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from './SearchInput'
import { FaMoon, FaBars, FaX } from 'react-icons/fa6'
import NotifIcon from '../assets/Images/icons8-notification-48.png'

const Searchbar = () => {
  const [query, setQuery] = useState("")
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const navigate = useNavigate()

  const handleSearch = (userquery) =>{
    setQuery(userquery)
  }

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpened(!isDropdownOpened)
  }

  const closeDropdown = () => {
    setIsDropdownOpened(false)
  }

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeDropdown()
      buttonRef.current?.focus()
    }
  }

  const handleNavigation = (path) => {
    closeDropdown()
    navigate(path)
  }

  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeDropdown()
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      // Clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/notifications", label: "Notifications" },
    { path: "/profile", label: "Profile" },
    { path: "/collections", label: "Collections" },
    { path: "/tags", label: "Tags" },
    { path: "/communitiesbytags", label: "Communities" },
    { path: "/ask-a-question", label: "Ask a Question" },
    { path: "/blog", label: "Blog" },
    { path: "/messages", label: "Messages" },
    { path: "/signin", label: "Log Out" }
  ]
  

  return (
    <header className={`bg-[#0A0B10] z-10 w-full lg:w-[calc(100%-266px)] fixed top-0 h-[100px] text-white flex justify-around items-center `}>
    <SearchInput onSearchChange={handleSearch} placeholderText={"Search anything globally"} classNames={"w-full"} aria-label="Search"/>
      <div className='flex items-center gap-4' aria-label="User Menu">
        <button 
          className="p-2 rounded-full hover:bg-[#1A1B20] focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10]"
          aria-label="Toggle dark mode"
        >
          <FaMoon className='max-lg:hidden text-[#ff7000] rotate-[-90deg] w-6 h-6' aria-hidden="true" />
        </button>
        <Link 
          to="notifications" 
          className="p-2 rounded-full hover:bg-[#1A1B20] focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10]"
          aria-label="Notifications"
        >
          <img 
            className='max-lg:hidden rounded-full w-10 h-10' 
            src={NotifIcon} 
            alt="Notifications"
            width="42"
            height="42"
          />
        </Link>
        <Link 
          to="profile" 
          className="p-2 rounded-full hover:bg-[#1A1B20] focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10]"
          aria-label="User profile"
        >
          <img 
            className='max-lg:hidden rounded-full w-10 h-10' 
            src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/4JkBtVU9QUwcwFCWi3AV" 
            alt="User profile"
            width="42"
            height="42"
          />
        </Link>
        <button 
          ref={buttonRef}
          onClick={toggleDropdown}
          className="lg:hidden p-2 rounded-full hover:bg-[#1A1B20] focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10]"
          aria-expanded={isDropdownOpened}
          aria-haspopup="true"
          aria-label="Toggle navigation menu"
        >
          {isDropdownOpened ? (
            <FaX className="w-6 h-6" aria-hidden="true" />
          ) : (
            <FaBars className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
        {isDropdownOpened && (
          <nav 
            ref={dropdownRef}
            className="absolute right-0 top-[100px] bg-[#0A0B10] w-[250px] rounded-lg shadow-lg py-2 z-50 border border-[#1A1B20]"
            role="menu"
            aria-label="Navigation menu"
          >
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full text-left px-4 py-2 hover:bg-[#1A1B20] transition-colors focus:outline-none focus:bg-[#1A1B20] focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10]"
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
        
    </header>
  )
}

export default Searchbar

