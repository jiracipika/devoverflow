import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Tag from './Tag.jsx'
import { FaThumbsUp, FaComment, FaEye, FaRegStar, FaStar } from 'react-icons/fa6'

const ExpandableCard = ({ title, author, asked, votes, comments, views, tags, id, imgSrc }) => {
    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        const savedCollections = JSON.parse(localStorage.getItem('collections') || '[]')
        const isAlreadyBookmarked = savedCollections.some(item => item.id === id)
        setIsBookmarked(isAlreadyBookmarked)
    }, [id])

    const saveToCollections = (cardData) => {
        const savedCollections = JSON.parse(localStorage.getItem("collections") || "[]")
        const updatedCollections = [...savedCollections, cardData]
        localStorage.setItem('collections', JSON.stringify(updatedCollections))
    }

    const removeFromCollections = (cardId) => {
        const savedCollections = JSON.parse(localStorage.getItem('collections') || '[]')
        const updatedCollections = savedCollections.filter(item => item.id !== cardId)
        localStorage.setItem('collections', JSON.stringify(updatedCollections))
    }

    const toggleBookmark = () => {
        const cardData = {
            id,
            title,
            author,
            asked,
            votes,
            comments,
            views,
            tags,
            imgSrc
        }

        if (!isBookmarked) {
            saveToCollections(cardData)
        } else {
            removeFromCollections(id)
        }

        setIsBookmarked(!isBookmarked)
    }

    return (
        
        <div id={id} className='p-4 sm:p-6 rounded-lg shadow-md bg-[#0B0D12] transition-all duration-200 hover:shadow-lg'>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <div className="">
                    <Link to={`/question/${id}`} className="block">
                        <h1 className='text-xs lg:text-base font-semibold pr-6 text-wrap w-[300px] sm:w-auto hover:text-purple-400 transition-colors leading-tight'>
                            {title || "Title Here"}
                        </h1>
                    </Link>
                </div>
                <button 
                    onClick={toggleBookmark} 
                    className='text-yellow-500 text-xl flex-none transition-colors hover:text-yellow-400'
                >
                    {isBookmarked ? <FaStar /> : <FaRegStar />}
                </button>
            </div>

            <div className='flex flex-wrap gap-2 mb-4 sm:mb-3'>
                {tags?.map((item) => (
                    <Tag key={item} text={item} className="text-xs lg:text-sm" />
                )) || <Tag text="hello" className="text-xs lg:text-sm" />}
            </div>

            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex items-center gap-2 mb-2 sm:mb-0'>
                    <img 
                        className='w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover' 
                        src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} 
                        alt="User" 
                    />
                    <div className="flex flex-col">
                        <Link to={`/user/${author}`} className="text-white font-semibold text-sm sm:text-base hover:underline">{author || "user"}</Link>
                        <span className="text-gray-500 text-xs sm:text-sm">• {asked || "Asked 3 minutes ago"}</span>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto'>
                    <div className='flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start'>
                        <FaThumbsUp className='text-[#1DA1F2] text-xl max-[1500px]:text-[16px]' />
                        <span className='text-base max-lg:text-[12px]'>Votes {votes || "25"}</span>
                    </div>
                    <div className='flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start'>
                        <FaComment className='text-[#1DA1F2] text-xl max-[1500px]:text-[16px]' />
                        <span className='text-base max-lg:text-[12px]'>Answers {comments.length || "0"}</span>
                    </div>
                    <div className='flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start'>
                        <FaEye className='text-[#1DA1F2] text-xl max-[100px]:text-[16px]' />
                        <span className='text-base max-lg:text-[12px]'>Views {views || "100"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandableCard