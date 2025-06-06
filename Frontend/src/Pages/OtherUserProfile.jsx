import React, { useState, useEffect } from 'react'
import ProfileFilterTab from '../Components/ProfileFilterTab'
import UserDataInfo from '../assets/UserData.js';
import ExpandableCard from '../Components/ExpandableCard.jsx';
import articles from '../assets/FakeData.js';
import AvatarPic from '../Components/AvatarPic';
import { useParams, Link } from 'react-router-dom';

const OtherUserProfile = () => {

    const [filterQuery, setFilterQuery] = useState("Top Posts")
    const [userData, setUserData] = useState(null)
    const [filteredPosts, setFilterPosts] = useState([])
    
    let params = useParams();

    useEffect(() => {
        const data = UserDataInfo.find(x => x.id == params.id);
        setUserData(data);
        // Initial post filtering when user data is loaded
        if (data) {
            setFilterPosts(articles.filter(article => article.author === data.Name));
        }
    }, [params.id]);

    useEffect(() => {
        if (!userData) return;

        let filteredPosts = articles.filter(article => article.author === userData.Name);
        
        if (filterQuery === "Top Posts") {
            // Sort by likes or other criteria for top posts
            filteredPosts = filteredPosts.sort((a, b) => b.likes - a.likes);
        } else if (filterQuery === "Answered") {
            // Filter posts where the user has commented
            filteredPosts = articles.filter(article => 
                article.comments.some(comment => comment.author === userData.Name)
            );
        }
        
        setFilterPosts(filteredPosts);
    }, [filterQuery, userData]);

    const handleFilterChosen = (userquery) => {
        setFilterQuery(userquery);
    }
    

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black h-full w-full p-6 flex-col'>
            <AvatarPic />
            <div className='rounded-md bg-[#0A0B10] h-full rounded-[20px] left-[157px] top-[101px]'>
                <button className='ml-[1000px] bg-custom-gradient text-[white] font-bold py-2 px-4 rounded'>Follow</button>
                {userData && (
                <>
                <h1 className='text-[white] text-4xl'>{userData.Name}</h1>
                <h3 className='text-[white] text-sm'>@{userData.Username}</h3>
                <p className='text-[white]'>{userData.Bio}</p>
                </>
            )}
            </div>
            <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
                <ProfileFilterTab onChosenFilter={handleFilterChosen}/>
                {filteredPosts.map((item) =>{
                    return (<Link to={`question/${item.id}`}><ExpandableCard key={item.id} {...item}/></Link>)
      })}
            </div>
        </section>
    )
}

export default OtherUserProfile