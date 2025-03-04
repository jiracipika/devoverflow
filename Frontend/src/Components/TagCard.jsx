import React from 'react'
import CommunityPic from '../Components/CommunityPic'


const TagCard = ({title, description, questions, id}) => {
    return (
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
            <div>
            <label className='bg-gray-800 hover:bg-gray-600 font-semibold text-[20px] p-2 rounded-lg cursor-pointer'>{title || "Title Name"}</label>
            <CommunityPic/>
            <p className='my-1'>{description || "Something"}</p>
            </div>
            <div className='flex justify-between'>
                <p><span className="text-[orange]">{questions || '122'}</span> Questions</p>
            </div>
        </div>
    )
}

export default TagCard