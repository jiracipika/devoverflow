import React, { useState } from 'react'
import { useEffect } from 'react'
import NotifData from '../assets/NotifData.js'

const NotificationCard = ({title, text, category, friendRequest, id, imgSrc, userQuery }) => {
    const classOnTheBasisOfCategory = {
        Messages: "text-white",
        Requests: "text-yellow-500",
        Schedule: "text-orange-500"
    }

    const [classForNotification, setClassForNotification] = useState()
    const [cards, setCards] = useState(NotifData)

    useEffect(() => {
        setClassForNotification(classOnTheBasisOfCategory[category])
    }, [category])

    const removeCard = (id) => {
        const newCards = cards.filter(
            (card) => card.id !== id
        )
        setCards(newCards)
    }

    return (
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-4 sm:p-6 rounded-lg'>
            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex items-center gap-2 sm:gap-3'>
                    <img 
                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover' 
                        src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} 
                        alt="User" 
                    />
                    <div className='flex flex-col'>
                        <p className='font-medium text-sm sm:text-base'>{title || "user"}</p>
                        <p className={`${classForNotification} text-xs sm:text-sm truncate w-[200px] sm:w-auto`}>
                            {text || "Text Here"}
                        </p>
                    </div>
                </div>
                
                {category === "Requests" && (
                    <div className='flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0'>
                        <button 
                            onClick={() => removeCard(id)} 
                            className='bg-custom-gradient p-2 sm:p-3 rounded-lg text-sm sm:text-base w-full sm:w-auto transition-colors hover:opacity-90'
                        >
                            Accept
                        </button>
                        <button 
                            onClick={() => removeCard(id)} 
                            className='bg-custom-gradient p-2 sm:p-3 rounded-lg text-sm sm:text-base w-full sm:w-auto transition-colors hover:opacity-90'
                        >
                            Decline
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationCard