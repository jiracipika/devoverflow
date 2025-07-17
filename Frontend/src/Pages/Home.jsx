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
  const [filterQuery, setFilterQuery] = useState("Newest")
  const [itemsToShow, setItemsToShow] = useState(5)
  const [filteredArticles, setFilteredArticles] = useState(articles)

  // Helper function to convert time strings to minutes
  const parseTimeToMinutes = (timeString) => {

    // Handle special case for "Just Now"
    if (timeString.toLowerCase() === "just now") {
      return 0;
    }

    // Try to match the pattern "number unit"
    const matches = timeString.match(/(\d+)\s+(\w+)/);
    if (!matches) {
      console.warn('Invalid time format:', timeString);
      return 0;
    }

    const number = matches[1];
    const unit = matches[2].toLowerCase();

     // Create a map of unit multipliers
     const unitMultipliers = {
      'minutes': 1,
      'minute': 1,
      'hours': 60,
      'hour': 60,
      'days': 24 * 60,
      'day': 24 * 60
    }

    const multiplier = unitMultipliers[unit] || 1;
    const num = parseInt(number);

    return num * multiplier;
  }

  const handleSearch = (userquery) => {
    setSearchQuery(userquery)
    console.log(userquery)

    // Filter articles based on search query
    const filtered = articles.filter(article => {
      const searchLower = userquery.toLowerCase()
      const titleMatch = article.title.toLowerCase().includes(searchLower)
      const contentMatch = article.content.toLowerCase().includes(searchLower)
      const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      return titleMatch || contentMatch || tagsMatch
    })

    setFilteredArticles(filtered)
  }

  const handleFilterChosen = (userquery) => {
    setFilterQuery(userquery)
    console.log(userquery)

    // If there's a search query, keep it filtered
    if (searchQuery) {
      const filtered = articles.filter(article => {
        const searchLower = searchQuery.toLowerCase()
        const titleMatch = article.title.toLowerCase().includes(searchLower)
        const contentMatch = article.content.toLowerCase().includes(searchLower)
        const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return titleMatch || contentMatch || tagsMatch
      })
      setFilteredArticles(filtered)
      return
    }

    if (userquery === "Newest") {
      const sortedArticles = [...articles].sort((a, b) => {
        const timeA = parseTimeToMinutes(a.asked)
        const timeB = parseTimeToMinutes(b.asked)
        return timeA - timeB
      })
      setFilteredArticles(sortedArticles)
    }
    else if (userquery === "Recommended") {
      setFilteredArticles(articles.sort((a, b) => b.votes - a.votes))
    }
    else if (userquery === "Frequent") {
      setFilteredArticles(articles.sort((a, b) => b.views - a.views))
    }
    else if (userquery === "Unanswered") {
      setFilteredArticles(articles.filter(article => article.comments.length === 0))
    }
  }

  const handleShowMore = () => {
    setItemsToShow(prev => prev + 5)
  }

  return (
    <div className='min-h-screen max-lg:h-auto text-white py-4 md:py-8 px-4 md:px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <header className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold'>All Questions</h1>
        <Link 
          className='bg-custom-gradient p-3 sm:p-4 rounded-lg font-semibold text-sm sm:text-base text-center whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
          to="ask-a-question"
        >
          Ask a Question
        </Link>
      </header>
      <div className='mb-6'>
        <SearchInput 
          onSearchChange={handleSearch} 
          placeholderText={"Search a Question here"} 
          classNames={"w-full"} 
        />
      </div>
      <div className='mb-6 overflow-x-auto'>
        <FilterQuestionTab onChosenFilter={handleFilterChosen} />
      </div>
      <div className='space-y-4'>
        {filteredArticles.slice(0, itemsToShow).map((item) => (
          <ExpandableCard key={item.id} {...item} />
        ))}
      </div>
      {itemsToShow < filteredArticles.length && (
        <div className='flex justify-center mt-6'>
          <button 
            onClick={handleShowMore} 
            className='bg-custom-gradient px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
          >
            Show More
          </button>
        </div>
      )}
    </div>
  )
}

export default Home