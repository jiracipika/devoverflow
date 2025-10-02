import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import AvatarPic from '../Components/AvatarPic';
import axios from 'axios';

const EditProfile = () => {
    const [isSuccessful, setisSuccessful] = useState(false)
    const [name, setName] = useState("")
    const [username, setUserName] = useState ("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateInfo();
        console.log("Updated Profile:", { name, bio, image });
        if (isSuccessful == true) {
            navigate('/profile'); 
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    const updateInfo = () => {
        if (name == "" || bio == "") {
            alert("Empty Input");
            return
        }
        //https://58ea-72-138-28-18.ngrok-free.app/api/user/editProfile
        try {
            const response = axios.put('https://jsonplaceholder.typicode.com/posts/1', {name: name, bio: bio, image: image});

            console.log('Edit Success', response.data);
            alert('Editing Success');
            setisSuccessful(!isSuccessful)
            console.log(isSuccessful)
        } catch (error) {
            console.error('Error during editing:', error.response ? error.response.data : error.message);
            alert('Editing failed. Please try again.');
        }
    }

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300 h-[900px] w-full flex flex-col items-center justify-start pt-10 lg:pr-[240px]'>
                {/* Profile Picture Preview */}
                {preview ? (
                    <img 
                        src={preview} 
                        alt="Profile Preview" 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-500 shadow-md"
                    />
                ) : (
                    <AvatarPic/>
                )}
            <div className="relative">
                {/* Upload Button */}
                <label className="relative bg-gray-800 dark:bg-gray-400 hover:bg-gray-700 text-white text-xl py-1 px-4 top-5 rounded cursor-pointer shadow-md">
                    Upload Picture
                    <input type="file" accept="image/*" className="hidden" onClick={handleImageChange} />
                </label>
            </div>
            <form onSubmit={handleSubmit}className='bg-[#0A0B10] dark:bg-gray-400  p-6 rounded-lg w-full max-w-md mt-10 shadow-md '>
                <h2 className="text-white text-lg font-bold mb-4">Edit Profile</h2>
                <label className="block text-gray-400 dark:text-black mb-1">Full Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 mb-4 rounded bg-gray-700 dark:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <label className="block text-gray-400 dark:text-black mb-1"> Username</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)}
                    className='w-full p-2 mb-4 rounded bg-gray-700 dark:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <label className="block text-gray-400 dark:text-black mb-1">Bio</label>
                <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    className='w-full p-2 mb-4 rounded bg-gray-700 dark:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <button 
                    type="submit" 
                    className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-white font-bold py-2 px-4 rounded w-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
                >
                    Update Profile
                </button>
            </form>
        </section>
    )
}

export default EditProfile