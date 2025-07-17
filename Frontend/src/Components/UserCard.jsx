import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AvatarPic from '../Components/AvatarPic.jsx';
import Tag from './Tag.jsx'

const UserCard = ({Name, Username, tags, id}) => {
    const [showAllTags, setShowAllTags] = useState(false);
    const displayedTags = showAllTags ? tags : tags?.slice(0, 4); // Show 4 tags by default on larger screens

    return(
        <div id={id} className='bg-card-gradient flex flex-col items-center sm:items-start gap-3 p-4 sm:p-6 2xl:p-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-900/20 h-full w-full'>
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 2xl:gap-6 w-full'>
                <div className='flex-shrink-0'>
                    <AvatarPic size="lg" className="w-16 h-16 sm:w-20 sm:h-20 2xl:w-24 2xl:h-24" />
                </div>
                <div className='text-center sm:text-left w-full'>
                    <Link to={`/user/${Name}`} className='group block'>
                        <h3 className='font-semibold text-lg sm:text-xl 2xl:text-2xl text-white group-hover:text-purple-400 transition-colors leading-tight'>
                            {Name || "Name"}
                        </h3>
                    </Link>
                    <p className='text-gray-300 text-sm sm:text-base 2xl:text-lg mt-1 2xl:mt-2'>
                        @{Username || "username"}
                    </p>
                </div>
            </div>
            
            {tags?.length > 0 && (
                <div className='w-full mt-2 2xl:mt-4'>
                    <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
                        {displayedTags.map((tag, index) => (
                            <Tag 
                                key={index} 
                                text={tag} 
                                className="text-xs sm:text-sm 2xl:text-base px-2 py-1 2xl:px-3 2xl:py-1.5" 
                            />
                        ))}
                        
                        {tags.length > 4 && (
                            <button 
                                className="text-xs sm:text-sm 2xl:text-base text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap px-2 py-1 2xl:px-3 2xl:py-1.5"
                                onClick={() => setShowAllTags(!showAllTags)}
                                aria-label={showAllTags ? 'Show fewer tags' : `Show ${tags.length - 4} more tags`}
                            >
                                {showAllTags ? 'Show less' : `+${tags.length - 4} more`}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserCard