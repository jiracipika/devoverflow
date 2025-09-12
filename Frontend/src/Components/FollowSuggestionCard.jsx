import React, { useState } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

const FollowSuggestionCard = ({id, Name, Username, imgSrc}) => {

  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async () => {
    try {
    // Toggle follow state
      const newFollowState = !isFollowing;
      setIsFollowing(newFollowState);
              
      // Make API call to update follow status
      await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
        status: newFollowState ? 'Followed' : 'Unfollowed'
      });
              
      console.log(`User ${newFollowState ? 'followed' : 'unfollowed'} successfully`);
      } catch (error) {
        // Revert state on error
        setIsFollowing(!isFollowing);
        console.error('Error updating follow status:', error);
    }
  };

  return (
    <>
        <div id={id} className='flex bg-card-gradient rounded-lg w-full justify-between p-2 items-center'>
            <div className='flex gap-3 items-center'>
                <img className='w-14 h-14 rounded-full' src={imgSrc} alt="" />
                <div className="">
                <Link to={`/user/${Name}`}><h1 className="text-lg hover:text-purple-400 transition-colors">{Name}</h1></Link>
                    <p className='text-sm'>@{Username}</p>
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