import React from 'react'

const NotificationCard = ({title, text, category, friendRequest, id, imgSrc, }) => {
    return(
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <img className='w-6 h-6 rounded-full' src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} alt="" />
                <p>{title || "user"}</p>
                <p>{text|| "Text Here"} </p>
                <button>{friendRequest || []} </button>
            </div>
            <div className='flex gap-4'>
            </div>
        </div>
    </div>
    )
}
export default NotificationCard