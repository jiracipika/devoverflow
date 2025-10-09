import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../Components/SearchInput';
import FilterQuestionTab from '../Components/FilterQuestionTab';
import articles from '../assets/FakeData.js';
import ExpandableCard from '../Components/ExpandableCard.jsx';
import { useSelector } from 'react-redux';

// Memoize the component to prevent unnecessary re-renders
const MemoizedExpandableCard = React.memo(ExpandableCard);

// Move unitMultipliers outside the component to prevent recreation
const UNIT_MULTIPLIERS = {
  'minutes': 1,
  'minute': 1,
  'hours': 60,
  'hour': 60,
  'days': 24 * 60,
  'day': 24 * 60
};

// Memoize the parse function since it doesn't depend on component state
const parseTimeToMinutes = (timeString) => {
  if (!timeString) return 0;
  if (timeString.toLowerCase() === "just now") return 0;

  const matches = timeString.match(/(\d+)\s+(\w+)/);
  if (!matches) {
    console.warn('Invalid time format:', timeString);
    return 0;
  }

  const number = matches[1];
  const unit = matches[2].toLowerCase();
  const multiplier = UNIT_MULTIPLIERS[unit] || 1;
  
  return parseInt(number, 10) * multiplier;
};

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("Newest");
  const [itemsToShow, setItemsToShow] = useState(5);
  
  // Memoize filtered articles to prevent recalculation on every render
  const filteredArticles = useMemo(() => {
    let result = [...articles];
    
    // Apply search filter if there's a search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(article => {
        return article.title.toLowerCase().includes(searchLower) ||
               article.content.toLowerCase().includes(searchLower) ||
               article.tags.some(tag => tag.toLowerCase().includes(searchLower));
      });
    }

    // Apply sorting based on filter
    switch (filterQuery) {
      case "Newest":
        return [...result].sort((a, b) => 
          parseTimeToMinutes(a.asked) - parseTimeToMinutes(b.asked)
        );
      case "Recommended":
        return [...result].sort((a, b) => b.votes - a.votes);
      case "Frequent":
        return [...result].sort((a, b) => b.views - a.views);
      case "Unanswered":
        return [...result].filter(article => article.comments.length === 0);
      default:
        return result;
    }
  }, [searchQuery, filterQuery]);

  // Memoize handlers to prevent unnecessary re-renders of child components
  const handleSearch = useCallback((userQuery) => {
    setSearchQuery(userQuery);
  }, []);

  const handleFilterChosen = useCallback((userQuery) => {
    setFilterQuery(userQuery);
  }, []);

  const handleShowMore = useCallback(() => {
    setItemsToShow(prev => Math.min(prev + 5, filteredArticles.length));
  }, [filteredArticles.length]);

  // Calculate visible articles to prevent slice on every render
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, itemsToShow);
  }, [filteredArticles, itemsToShow]);

  const canShowMore = itemsToShow < filteredArticles.length;

  return (
    <div 
      className='min-h-screen max-lg:h-auto text-white py-4 md:py-8 px-4 md:px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300'
      role="main"
      aria-label="Questions list"
    >
      <header className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold'>All Questions</h1>
        <Link 
          className='bg-custom-gradient p-3 sm:p-4 rounded-lg font-semibold text-sm sm:text-base text-center whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
          to="ask-a-question"
          aria-label="Ask a question"
        >
          Ask a Question
        </Link>
      </header>
      
      <div className='mb-6'>
        <SearchInput 
          onSearchChange={handleSearch} 
          placeholderText="Search a Question here" 
          classNames="w-full" 
        />
      </div>
      
      <div className='mb-6 overflow-x-auto'>
        <FilterQuestionTab onChosenFilter={handleFilterChosen} />
      </div>
      
      <div className='space-y-4' role="list" aria-label="List of questions">
        {visibleArticles.map((item) => (
          <MemoizedExpandableCard key={item.id} {...item} />
        ))}
      </div>
      
      {canShowMore && (
        <div className='flex justify-center mt-6'>
          <button 
            onClick={handleShowMore} 
            className='bg-custom-gradient px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
            aria-label="Load more questions"
          >
            Show More
          </button>
        </div>
      )}
      
      {/* Add a subtle loading indicator for better UX */}
      {filteredArticles.length === 0 && (
        <p className="text-center text-gray-400 py-8">No questions found. Try adjusting your search.</p>
      )}
    </div>
  );
};

export default React.memo(Home);