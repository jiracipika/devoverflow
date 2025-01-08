import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaYoutube   } from "react-icons/fa6";

const Home = () => {
  return (
    <section className='bg-[#25438B] h-fit w-full p-6'>
      <header className='bg-white rounded-md p-6 flex flex-col gap-6'>
        <h1 className='font-extrabold text-3xl text-center'>A GET TOGETHER FOR <br /> <span className='text-[#21c7e7]'>LIKE-MINDED PEOPLE</span></h1>
        <div className='flex px-10 gap-10'>
          <div>
            <p className='text-2xl font-bold'>Our executive network provides a trusted platform for senior professionals to collaborate, share insights, and build strategic partnerships that fuel growth and innovation.</p>
          </div>
          <hr className='w-[40px] h-[200px] bg-gray-500' />
          <div>
            <p className='text-2xl font-bold'>Join a global network of industry leaders to exchange ideas, access exclusive resources, and discover opportunities that accelerate personal and organizational success.</p>
          </div>
          <hr className='w-[40px] h-[200px] bg-gray-500' />
          <div>
            <p className='text-2xl font-bold'>Elevate your influence and impact by connecting with top executives in a dynamic environment designed for knowledge-sharing, mentorship, and business advancement.</p>
          </div>
        </div>
      </header>

      <section className='p-6 mt-12 rounded-md bg-[#8da7cf] w-full h-fit'>
        <h1 className=' text-center font-extrabold text-3xl'>Visionary Hive</h1>
        <p className='w-fit mt-[12px] m-auto'>Your ideas <br /> revolutionize the world</p>
        <div className='flex justify-around mt-[12px]'>
          <Link className='bg-[#b1b2b5] p-5 rounded-lg' to={""}>Start Networking</Link>
          <Link className='bg-[#b1b2b5] p-5 rounded-lg' to={"signup"}>Sign Up</Link>
        </div>
      </section>

      <section className='w-full bg-white h-fit p-6 rounded-md mt-12'>
        <h1 className='text-center font-extrabold text-3xl'>Contact Us</h1>
        <div>
          <div className='flex items-center gap-6'>
            <Link><FaLinkedin className='text-6xl text-blue-600' /></Link>
            <p className='text-2xl'>PlaceHolder</p>
          </div>
          <div className='flex items-center gap-6'>
            <Link><FaInstagram className='text-6xl text-red-500'/></Link>
            <p className='text-2xl'>PlaceHolder</p>
          </div>
          <div className='flex items-center gap-6'>
            <Link><FaYoutube className='text-6xl text-red-700' /></Link>
            <p className='text-2xl'>PlaceHolder</p>
          </div>
        </div>
      </section>
    </section>
  )
}

// Our executive network provides a trusted platform for senior professionals to collaborate, share insights, and build strategic partnerships that fuel growth and innovation.
// Join a global network of industry leaders to exchange ideas, access exclusive resources, and discover opportunities that accelerate personal and organizational success.
// Elevate your influence and impact by connecting with top executives in a dynamic environment designed for knowledge-sharing, mentorship, and business advancement.
export default Home