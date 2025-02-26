import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ProfileFilterTab from '../Components/ProfileFilterTab'
import ExpandableCard from '../Components/ExpandableCard.jsx';
import articles from '../assets/FakeData.js';
import AvatarPic from '../Components/AvatarPic'

const profile = () => {

    const [filterQuery, setFilterQuery] = useState("")

    const handleFilterChosen = (userquery) =>{
        setFilterQuery(userquery)
        console.log(userquery)
      }
    

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black h-full w-full p-6 flex-col'>
            <AvatarPic />
            <div className='rounded-md bg-[#0A0B10] h-full rounded-[20px] left-[157px] top-[101px]'>
                <button className='ml-[700px] bg-gray-500 text-[white] font-bold py-2 px-4 rounded'><Link to="/editProfile">Edit Profile</Link></button>
                <h1 className='text-[white] text-4xl'>Dao</h1>
                <p className='text-justify text-[white]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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

export default profile