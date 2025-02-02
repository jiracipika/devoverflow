import React from 'react'
import FollowSuggestionCard from './FollowSuggestionCard'
import Tag from './Tag'

const Footer = () => {
  return (
    <footer className=' text-white p-4 gap-6 flex flex-col justify-around h-screen w-[330px] fixed top-0 right-0 bg-[#0A0B10]'>
        <div className='relative flex gap-4 flex-col top-[100px]'>
          <FollowSuggestionCard fullName={"Full Name"} username={"username"} imgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} />
          <FollowSuggestionCard fullName={"Full Name"} username={"username"} imgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} />
          <FollowSuggestionCard fullName={"Full Name"} username={"username"} imgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} />
          <FollowSuggestionCard fullName={"Full Name"} username={"username"} imgSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} />
        </div>
  
        <div className="tags grid grid-cols-2 gap-2">
          <Tag classnames={"grid col-span-2"} text={"About Us"} />
          <Tag text={"Contact Us"} />
          <Tag text={"Policy"} />
          <Tag classnames={"grid col-span-2 w-fit"} text={"© 2025 Networking Tool. All rights reserved."} />
        </div>
    </footer>
  )
}

export default Footer