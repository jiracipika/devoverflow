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

  const data = {id: articles.id, title: articles.title}
  console.log(data)
  const data2 = {articles}
  console.log(data2)

  return (
    <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <header className='flex justify-between'>
        <h1 className='text-[30px] font-bold'>All Questions</h1>
        <Link className='bg-custom-gradient p-4 rounded-lg font-semibold' to="ask-a-question">Ask a Question</Link>
      </header>
      <SearchInput onSearchChange={handleSearch} placeholderText={"Search a Question here"} classNames={"w-full"} />
      <FilterQuestionTab onChosenFilter={handleFilterChosen} />
      {articles.map((item, index) =>{
        console.log('itemId', item.id);
        return (<Link to={`question/${item.id}`}><ExpandableCard key={item.id} {...item}/></Link>)

      })}
    </div>
  )
}

export default Home