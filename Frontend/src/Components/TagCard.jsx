import React from 'react'
import {Link} from "react-router-dom";

const TagCard = ({id, title, description, questions}) => {
    return (
        <div id={id} className='h-fit bg-[#0B0D12] flex flex-col gap-3 p-9 rounded-lg'>
            <div className="">
                <Link to={`/tagSection/${id}`} ><label className='bg-gray-800 hover:bg-gray-600 transition ease-in-out font-semibold text-[20px] p-2 rounded-lg cursor-pointer max-[1480px]:text-[15px] max-[1350px]:text-[14px]'>{title || "Title Name"}</label></Link>
            </div>
            <p className='my-1 truncate'>{description || "Something"}</p>
            <div className='flex justify-between'>
                <p><span className="text-[orange]">{questions || '0'}</span> Questions</p>
            </div>
        </div>
    )
}

export default TagCard