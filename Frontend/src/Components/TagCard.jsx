import React from 'react'
import TagPic from '../Components/TagPic'


const TagCard = ({title, description, questions, id}) => {
    return (
        <div id={id} className='bg-card-gradient flex flex-col gap-3 p-9 rounded-lg'>
            <div className="">
                <label className='bg-gray-800 hover:bg-gray-600 font-semibold text-[20px] p-2 rounded-lg cursor-pointer'>{title || "Title Name"}</label>
            </div>
            <p className='my-1'>{description || "Something"}</p>
            <div className='flex justify-between'>
                <p><span className="text-[orange]">{questions || '122'}</span> Questions</p>
            </div>
        </div>
    )
}

export default TagCard