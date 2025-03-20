import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaYoutube   } from "react-icons/fa6";
import SearchInput from '../Components/SearchInput';
import FilterQuestionTab from '../Components/FilterQuestionTab';
import articles from '../assets/FakeData.js'
import ExpandableCard from '../Components/ExpandableCard.jsx';
import { useSelector } from 'react-redux';

const Home = () => {
  const auth = useSelector((state) => state.auth)
  console.log("auth from the home page ", auth)
  const [searchQuery,setSearchQuery] = useState("")
  const [filterQuery, setFilterQuery] = useState("")

  const handleSearch = (userquery) =>{
    setSearchQuery(userquery)
    console.log(userquery)
  }

  const handleFilterChosen = (userquery) =>{
    setFilterQuery(userquery)
    console.log(userquery)
  }

  return (
    <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <header className='flex justify-between'>
        <h1 className='text-[30px] font-bold'>All Questions</h1>
        <Link className='bg-custom-gradient p-4 rounded-lg font-semibold' to="ask-a-question">Ask a Question</Link>
      </header>
      <SearchInput onSearchChange={handleSearch} placeholderText={"Search a Question here"} classNames={"w-full"} />
      <FilterQuestionTab onChosenFilter={handleFilterChosen} />
      {articles.map((item, index) =>{
        return (<ExpandableCard id={index} author={item.author} tags={item.tags} votes={item.likes} answers={item.comments.length} views={item.views} tittle={item.title}/>)

      })}
    </div>
  )
}

// Our executive network provides a trusted platform for senior professionals to collaborate, share insights, and build strategic partnerships that fuel growth and innovation.
// Join a global network of industry leaders to exchange ideas, access exclusive resources, and discover opportunities that accelerate personal and organizational success.
// Elevate your influence and impact by connecting with top executives in a dynamic environment designed for knowledge-sharing, mentorship, and business advancement.
export default Home