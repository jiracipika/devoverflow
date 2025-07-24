import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({ 
    title, 
    text, 
    category, 
    friendRequest,
    messageView,
    id, 
    imgSrc, 
    onRemove 
}) => {
    
    const navigate = useNavigate();

    const classOnTheBasisOfCategory = {
        Messages: "text-white",
        Requests: "text-yellow-500"
    }

    const [classForNotification, setClassForNotification] = useState("");

    useEffect(() => {
        setClassForNotification(classOnTheBasisOfCategory[category] || "");
    }, [category]);

    const handleAction = (accepted = false) => {
        // If it's a friend request and accepted, you might want to handle the acceptance logic here
        if (friendRequest && accepted) {
            console.log("Friend request accepted for:", title);
            // Add friend logic would go here
        }
        
        // Call the onRemove callback with the notification id
        if (onRemove) {
            onRemove(id);
        }
    };

    const handleMessageView = () => {
        navigate(`/messages`)
    }

    return (
        <div id={`notification-${id}`} className='bg-card-gradient flex flex-col gap-3 p-4 sm:p-6 rounded-lg'>
            <div className='flex flex-col sm:flex-row justify-between w-full'>
                <div className='flex items-center gap-2 sm:gap-3'>
                    <img 
                        className='w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover' 
                        src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} 
                        alt={title || "User"} 
                    />
                    <div className='flex flex-col'>
                        <p className='font-medium text-sm sm:text-base'>{title || "user"}</p>
                        <p className={`${classForNotification} text-xs sm:text-sm truncate w-[200px] sm:w-auto`}>
                            {text || "Text Here"}
                        </p>
                    </div>
                </div>
                
                {friendRequest && (
                    <div className='flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0'>
                        <button 
                            onClick={() => handleAction(true)} 
                            className='bg-custom-gradient p-2 sm:p-3 rounded-lg text-sm sm:text-base w-full sm:w-auto transition-colors hover:opacity-90'
                        >
                            Accept
                        </button>
                        <button 
                            onClick={() => handleAction(false)} 
                            className='bg-custom-gradient p-2 sm:p-3 rounded-lg text-sm sm:text-base w-full sm:w-auto transition-colors hover:opacity-90'
                        >
                            Decline
                        </button>
                    </div>
                )}

                {messageView && (
                    <div className='flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0'>
                        <button 
                            onClick={() => handleMessageView()} 
                            className='bg-custom-gradient p-2 sm:p-3 rounded-lg text-sm sm:text-base w-full sm:w-auto transition-colors hover:opacity-90'
                        >
                            View
                        </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;