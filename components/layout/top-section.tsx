"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Moon, Bell, User } from "lucide-react"

interface TopSectionProps {
  placeholderText?: string
}

const TopSection: React.FC<TopSectionProps> = ({ placeholderText = "Search anything globally" }) => {
  const [query, setQuery] = useState("")

  return (
    <div className="bg-[#0A0B10] w-full h-16 sm:h-20 text-white flex items-center justify-between px-4 sm:px-6 border-b border-gray-800">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-[#7B8EC8]">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderText}
            className="w-full bg-[#0E1115] text-[#7B8EC8] placeholder-[#7B8EC8] 
                     pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-700
                     focus:border-orange-500 transition-colors
                     text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-2 sm:gap-4 ml-4">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Moon className="text-[#ff7000] w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <Link to="/notifications" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>

        <Link to="/profile" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
      </div>
    </div>
  )
}

export default TopSection
