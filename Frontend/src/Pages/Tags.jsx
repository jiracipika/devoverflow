import React, {useState} from 'react'
import {Link} from "react-router-dom";
import SearchInput from '../Components/SearchInput';
import TagCard from '../Components/TagCard.jsx';
import TagCardInfo from '../assets/TagSampleData.js';

const Tags = () => {

    const [searchQuery,setSearchQuery] = useState("")

    const handleSearch = (userquery) =>{
        setSearchQuery(userquery)
        console.log(userquery)
      }

    return (
        <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <SearchInput onSearchChange={handleSearch} placeholderText={"Search by Tag Name"} classNames={"w-full"} />
            <div>
            {TagCardInfo.map((item, index) =>{
        return (
        <Link key={item.id} to={`/tagSection/${item.id}`} >
            <TagCard id={index} title={item.title} description={item.description} questions={item.questions}/>
        </Link>)

      })}    
            </div>
        </section>
    )
}

export default Tags