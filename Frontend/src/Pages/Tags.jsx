import React, {useState} from 'react'
import {Link} from "react-router-dom";
import SearchInput from '../Components/SearchInput';
import TagCard from '../Components/TagCard.jsx';
import TagCardInfo from '../assets/TagSampleData.js';
import TagFilterTab from '../Components/TagFilterTab.jsx';

const Tags = () => {

    const [searchQuery,setSearchQuery] = useState("")
    const [filterQuery, setFilterQuery] = useState("")

    const handleSearch = (userquery) =>{
        setSearchQuery(userquery)
        console.log(userquery)
      }
    
    const handleFilterChosen = (userquery) =>{
        setFilterQuery(userquery)
        if (userquery == "Popular"){
            TagCardInfo.sort((a, b) => b.questions - a.questions);
        }
        else if (userquery == "Name"){
            TagCardInfo.sort((a, b) => a.title.localeCompare(b.title));
        }
        console.log(userquery)
      }

    return (
        <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <SearchInput onSearchChange={handleSearch} placeholderText={"Search by Tag Name"} classNames={"w-[18%] p-2 rounded-lg"} />
            <TagFilterTab onChosenFilter={handleFilterChosen}/>
            <div className='grid grid-cols-3 flex gap-2'>
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