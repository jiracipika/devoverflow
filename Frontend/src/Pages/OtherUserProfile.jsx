import React, { useState, useEffect } from 'react'
import axios from '../utils/axios'
import ProfileFilterTab from '../Components/ProfileFilterTab'
import UserDataInfo from '../assets/UserData.js';
import ExpandableCard from '../Components/ExpandableCard.jsx';
import articles from '../assets/FakeData.js';
import AvatarPic from '../Components/AvatarPic';
import { useParams, useNavigate } from 'react-router-dom';

const OtherUserProfile = () => {
    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = useState("Top Posts")
    const [userData, setUserData] = useState({})
    const [filteredPosts, setFilterPosts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [userNotFound, setUserNotFound] = useState(false)
    
    let params = useParams();

    useEffect(() => {
        const username = params.username;
        const data = UserDataInfo.find(x => x.Name === username);
        if (data) {
            setUserData(data);
            setIsFollowing(false);
            setUserNotFound(false);
            setFilterPosts(articles.filter(article => article.author === data.Name));
        } else {
            console.error('User not found:', username);
            setUserNotFound(true);
            setUserData({});
        }
    }, [params.username]);

    useEffect(() => {
        if (!userData || !userData.Name) return;

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

    const handleFollow = async () => {
        try {
            // Toggle follow state
            const newFollowState = !isFollowing;
            setIsFollowing(newFollowState);
            
            // Make API call to update follow status
            await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
                status: newFollowState ? 'Followed' : 'Unfollowed'
            });
            
            console.log(`User ${newFollowState ? 'followed' : 'unfollowed'} successfully`);
        } catch (error) {
            // Revert state on error
            setIsFollowing(!isFollowing);
            console.error('Error updating follow status:', error);
        }
    };

    const handleMessage = () => {
        if (userData && userData.Username) {
            navigate(`/messages`)
        }
    }

    if (userNotFound) {
        return (
            <section className='bg-gradient-to-r from-[#0A0B10] to-black min-h-screen w-full lg:w-[calc(100%-330px)] p-6 flex flex-col items-center justify-center'>
                <div className='text-center max-w-md'>
                    <h1 className='text-4xl font-bold text-white mb-4'>User Not Found</h1>
                    <p className='text-gray-300 mb-8'>
                        The user "{params.username}" doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className='bg-custom-gradient text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
                    >
                        Go Back
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black h-full w-full lg:w-[calc(100%-330px)] p-6 flex-col'>
            <AvatarPic />
            <div className='rounded-md bg-[#0A0B10] h-full rounded-[20px] left-[157px] top-[101px]'>
                <div className='flex gap-4 justify-end'>
                    <button 
                        onClick={handleFollow}
                        className='bg-custom-gradient text-[white] font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button
                        onClick={handleMessage}
                        className='bg-custom-gradient text-[white] font-bold py-2 px-4 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
                    >
                        Message
                    </button>
                </div>
                {userData && (
                    <>
                        <h1 className='text-[white] text-4xl'>{userData.Name}</h1>
                        <h3 className='text-[white] text-sm'>@{userData.Username}</h3>
                        <p className='text-[white]'>{userData.Bio}</p>
                    </>
                )}
            </div>
            <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 bg-gradient-to-r from-[#0A0B10] to-black'>
                <ProfileFilterTab onChosenFilter={handleFilterChosen}/>
                {filteredPosts.map((item) => (
                    <ExpandableCard key={item.id} {...item}/>
                ))}
            </div>
        </section>
    )
}

export default OtherUserProfile