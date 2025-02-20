import React from 'react'
import { Link } from 'react-router-dom'

const FollowSuggestionCard = ({fullName, username, imgSrc}) => {
  return (
    <>
        <div className='flex bg-card-gradient rounded-lg w-full justify-between p-2 items-center'>
            <div className='flex gap-3 items-center'>
                <img className='w-14 h-14 rounded-full' src={imgSrc} alt="" />
                <div className="">
                    <h1>{fullName}</h1>
                    <p>@{username}</p>
                </div>
            </div>
            <Link className='bg-custom-gradient p-2 rounded-lg'>Follow</Link>
        </div>
    </>
  )
}

export default FollowSuggestionCard