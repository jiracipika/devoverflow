import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import AvatarPic from '../Components/AvatarPic'

const EditProfile = () => {
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateInfo();
        console.log("Updated Profile:", { name, bio });
        navigate('/profile'); 
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

        try {
            const response = axios.post('https://6ecc-72-138-28-18.ngrok-free.app/api/auth/register', {
                name: name,
                bio: bio,
                image: image,
            });

            console.log('Edit Success', response.data);
            alert('Editing Success');
        } catch (error) {
            console.error('Error during editing:', error.response ? error.response.data : error.message);
            alert('Editing failed. Please try again.');
        }
    }

    return (
        <section className='bg-gradient-to-r from-[#0A0B10] to-black h-full w-full'>
            <div className="relative">
                {/* Profile Picture Preview */}
                {preview ? (
                    <img 
                        src={preview} 
                        alt="Profile Preview" 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-500 shadow-md"
                    />
                ) : (
                    <AvatarPic />
                )}
                
                {/* Upload Button */}
                <label className="relative bg-gray-700 hover:bg-gray-600 text-white text-xl py-1 px-4 top-5 rounded cursor-pointer">
                    Upload Picture
                    <input type="file" accept="image/*" className="hidden" onClick={handleImageChange} />
                </label>
            </div>
            <form onSubmit={handleSubmit}className='bg-[#1A1B21] p-6 rounded-lg w-full max-w-md mt-10 shadow-md'>
                <h2 className="text-white text-lg font-bold mb-4">Edit Profile</h2>
                <label className="block text-gray-400 mb-1">Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <label className="block text-gray-400 mb-1">Bio</label>
                <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    className='w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
                />
                <button 
                    type="submit" 
                    className='bg-gradient-to-r from-[#FF7000] to-[#E2995F] text-white font-bold py-2 px-4 rounded w-full transition-all'
                >
                    Update Profile
                </button>
            </form>
        </section>
    )
}

export default EditProfile