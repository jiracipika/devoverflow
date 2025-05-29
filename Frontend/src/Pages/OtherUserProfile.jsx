import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom";
import ProfileFilterTab from '../Components/ProfileFilterTab'
import UserDataInfo from '../assets/UserData.js';
import ExpandableCard from '../Components/ExpandableCard.jsx';
import articles from '../assets/FakeData.js';
import AvatarPic from '../Components/AvatarPic';
import { useParams } from 'react-router-dom';

const OtherUserProfile = () => {

    const [user, setUser] = useState(null);
    
    let params = useParams();

    //const { id } = useParams();
    //console.log(id)

    //const filteredUser = UserDataInfo.filter(user => user.tags.includes(id));
    //console.log(filteredUser)
    //console.log(filteredUser)

    useEffect(()=> {
        const data = UserDataInfo.find(x => x.id == params.id);
        console.log(data)
    setUser(data);
    }, [])

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
                {user && (
                <>
                <h1 className='text-[white] text-4xl'>{user.Name}</h1>
                <h3 className='text-[white] text-sm'>@{user.Username}</h3>
                <p className='text-[white]'>{user.Bio}</p>
                </>
            )}
            </div>
            <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
                <ProfileFilterTab onChosenFilter={handleFilterChosen}/>
                {articles.map((item) =>{
                    return (<Link to={`question/${item.id}`}><ExpandableCard key={item.id} {...item}/></Link>)
      })}
            </div>
        </section>
    )
}

export default OtherUserProfile