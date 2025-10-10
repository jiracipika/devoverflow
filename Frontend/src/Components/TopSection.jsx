import React, { useState, useRef, useEffect, useCallback, memo } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaX } from 'react-icons/fa6'
import NotifIcon from '../assets/Images/icons8-notification-48.png'
import ThemeToggle from './ThemeToggle'
import GlobalSearchBar from '../Components/GlobalSearchBar';

const Searchbar = () => {
  const [query, setQuery] = useState("")
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const navigate = useNavigate()

  // Memoize the search handler
  const handleSearch = useCallback((userQuery) => {
    setQuery(userQuery);
    // Consider adding debounce here if search happens on type
  }, []);

  // Memoize the toggle function
  const toggleDropdown = useCallback((e) => {
    e?.stopPropagation();
    setIsDropdownOpened(prev => !prev);
  }, []);

  // Memoize the close function
  const closeDropdown = useCallback(() => {
    setIsDropdownOpened(false);
  }, []);

  // Handle keyboard navigation
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      buttonRef.current?.focus();
    }
  }, [closeDropdown]);

  // Handle navigation with proper cleanup
  const handleNavigation = useCallback((path) => {
    if (path) {
      navigate(path);
    }
    closeDropdown();
  }, [navigate, closeDropdown]);

   // Handle logout with proper error handling
   const handleLogOut = useCallback(async (e) => {
    e?.preventDefault();
    
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', {});
      
      // Clear user session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      
      // Navigate to signin page
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Consider adding user feedback here
    }
  }, [navigate]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeDropdown, handleEscape]);

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
    { path: null, label: "Log Out", onClick: handleLogOut }
  ]
  

  return (
    <header 
      className="bg-[#0A0B10] dark:bg-gray-200 z-10 w-full lg:w-[calc(100%-266px)] fixed top-0 h-[100px] text-white flex justify-around items-center"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="w-full max-w-2xl px-4">
        <GlobalSearchBar 
          onSearchChange={handleSearch} 
          placeholderText="Search anything globally" 
          classNames="w-full" 
          aria-label="Search"
        />
      </div>
      
      <div className="flex items-center gap-4 px-4" aria-label="User Menu">
        <ThemeToggle />
        
        <Link 
          to="/notifications" 
          className="max-lg:hidden p-2 rounded-full hover:bg-[#1A1B20] dark:hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10] transition-colors"
          aria-label="Notifications"
        >
          <img 
            className="w-8 h-8" 
            src={NotifIcon} 
            alt="Notifications"
            width="32"
            height="32"
            aria-hidden="true"
          />
        </Link>
        
        <Link 
          to="/profile" 
          className="max-lg:hidden p-1 rounded-full hover:bg-[#1A1B20] dark:hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10] transition-colors"
          aria-label="User profile"
        >
          <img 
            className="rounded-full w-8 h-8 object-cover" 
            src="https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/4JkBtVU9QUwcwFCWi3AV" 
            alt="User profile"
            width="32"
            height="32"
          />
        </Link>
        
        <button 
          ref={buttonRef}
          onClick={toggleDropdown}
          className="lg:hidden p-2 rounded-full hover:bg-[#1A1B20] dark:hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7000] focus:ring-offset-2 focus:ring-offset-[#0A0B10] transition-colors"
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
        
        {/* Mobile Dropdown Menu */}
        {isDropdownOpened && (
          <nav 
            ref={dropdownRef}
            className="absolute right-4 top-[90px] bg-[#0A0B10] dark:bg-gray-200 w-[calc(100%-2rem)] max-w-xs rounded-lg shadow-lg py-2 z-50 border border-[#1A1B20] dark:border-gray-400"
            role="menu"
            aria-label="Navigation menu"
          >
            {navItems.map((item) => (
              <button
                key={item.path || item.label}
                onClick={() => item.onClick ? item.onClick() : handleNavigation(item.path)}
                className="w-full text-left px-6 py-3 hover:bg-[#1A1B20] dark:hover:bg-gray-300 transition-colors flex items-center gap-3 focus:outline-none focus:bg-[#1A1B20] focus:ring-2 focus:ring-[#ff7000]"
                role="menuitem"
              >
                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default memo(Searchbar);
