import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const FollowSuggestionCard = ({id, Name, Username, imgSrc}) => {

  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async () => {
    try {
        // Here you would typically make an API call to follow the user
        // For now, we'll just toggle the state
        setIsFollowing(!isFollowing);
        
        // In a real application, you would:
        // 1. Make an API call to follow/unfollow the user
        // 2. Update the UI based on the response
        // 3. Handle any errors that might occur
        
    } catch (error) {
        console.error('Error following user:', error);
        // In a real app, you would show an error message to the user
    }
}

  return (
    <>
        <div id={id} className='flex bg-card-gradient rounded-lg w-full justify-between p-2 items-center'>
            <div className='flex gap-3 items-center'>
                <img className='w-14 h-14 rounded-full' src={imgSrc} alt="" />
                <div className="">
                <Link to={`/user/${Name}`}><h1 className="hover:text-purple-400 transition-colors">{Name}</h1></Link>
                    <p>@{Username}</p>
                </div>
            </div>
            <button 
              onClick={handleFollow}
              className='bg-custom-gradient text-[white] font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
            >
            {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    </>
  )
}

export default FollowSuggestionCard