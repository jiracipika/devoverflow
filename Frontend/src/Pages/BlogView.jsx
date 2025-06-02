import React, { useState, useEffect } from 'react';
import { useParams, Link }  from 'react-router-dom';
import {blogPosts} from "../data/blogData.js";
import Tag from '../Components/Tag.jsx'

const BlogView = () => {

  const [user, setUser] = useState(null);

  let params = useParams();

  useEffect(()=> {
    const data = blogPosts.find(post => post.id == params.id);
    console.log(data)
    setUser(data);
  }, [])

  return (
    <div className='min-h-screen text-white p-6 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      {user && (
        <>
        <img src={user.imageUrl} alt="" />
        <h1>{user.title}</h1>

        <div className='flex flex-wrap gap-2 mb-3'>
          {
          user.tags ? user.tags.map((item) =>{ 
            return (<Link key={item} to={`/tags`} ><Tag text={item}/></Link>)
          })
          :
          <Tag text={"hello"}/>
          }
        </div>

        <div className='flex items-center gap-2'>
          <h3>{user.date}</h3>
          <div className='inline-flex items-center justify-end gap-2'>
            <h3 className=''>{user.author.name}</h3>
            <img className="w-[20%] rounded-[50px]" src={user.author.avatar} alt="" />
          </div>
        </div>

        <div>
          <p>{user.description}</p>
        </div>


        </>
      )}
    </div>
  )
}

export default BlogView