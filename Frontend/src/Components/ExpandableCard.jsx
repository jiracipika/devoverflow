import React from 'react'
import articles from '../assets/FakeData.js'
import Tag from './Tag.jsx'
import { FaThumbsUp, FaComment, FaEye} from 'react-icons/fa6'

const ExpandableCard = ({tittle, author, createdDate, votes, answers, views, tags, id, imgSrc}) => {
    console.log(tags)
  return (
    <div id={id} className='bg-card-gradient flex flex-col gap-3 p-10 rounded-lg'>
        <h1 className='font-semibold text-[20px]'>{tittle || "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this"}</h1>
        <div className='flex gap-2'>
            {
                tags ? tags.map((item) =>{
                    return (<Tag text={item}/>)
                })
                :
                <Tag text={"hello"}/>
                
            }

        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <img className='w-6 h-6 rounded-full' src={imgSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s"} alt="" />
                <p>{author || "user"}</p>
                <p>{createdDate || "12-12-2024"} </p>
            </div>
            <div className='flex gap-4'>
                <button className='flex items-center gap-2'><FaThumbsUp  className='text-[#1DA1F2]'/><span>Votes {votes || "25" }</span></button>
                <button className='flex items-center gap-2'><FaComment className='text-[#1DA1F2]'/><span>Answers {answers || "10" }</span></button>
                <button className='flex items-center gap-2'><FaEye className='text-[#1DA1F2]'/><span>Views {views || "100" }</span></button>
            </div>
        </div>
    </div>
  )
}

export default ExpandableCard