import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ProfileFilterTab from '../Components/ProfileFilterTab'
import ExpandableCard from '../Components/ExpandableCard.jsx';
import articles from '../assets/FakeData.js';
import AvatarPic from '../Components/AvatarPic';

const OtherUserProfile = () => {

    const [filterQuery, setFilterQuery] = useState("")

    const handleFilterChosen = (userquery) =>{
        setFilterQuery(userquery)
        console.log(userquery)
      }
    

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black h-full w-full p-6 flex-col'>
            <AvatarPic />
            <div className='rounded-md bg-[#0A0B10] h-full rounded-[20px] left-[157px] top-[101px]'>
                <button className='ml-[1000px] bg-custom-gradient text-[white] font-bold py-2 px-4 rounded'>Follow</button>
                <h1 className='text-[white] text-4xl'>Other User</h1>
                <h3 className='text-[white] text-sm'>@Other User</h3>
                <p className='text-[white]'>Sample Bio Here</p>
            </div>
            <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
                <ProfileFilterTab onChosenFilter={handleFilterChosen}/>
                {articles.map((item, index) =>{
        return (<ExpandableCard id={index} author={item.author} tags={item.tags} votes={item.likes} answers={item.comments.length} views={item.views} tittle={item.title}/>)

      })}
            </div>
        </section>
    )
}

export default OtherUserProfile