import React, { useMemo, useCallback } from 'react'
import SearchInput from '../Components/SearchInput'
import TagCard from '../Components/TagCard.jsx'
import TagFilterTab from '../Components/TagFilterTab.jsx'
import { useTags } from '../context/TagsContext';
import articles from '../assets/FakeData';

// Memoize the TagCard component to prevent unnecessary re-renders
const MemoizedTagCard = React.memo(TagCard);

const Tags = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterQuery,
    setFilterQuery,
    filteredTags,
    selectedTag,
    setSelectedTag,
    isAdmin
  } = useTags()

  // Count questions per tag from articles data
  const tagCounts = useMemo(() => {
    return articles.reduce((counts, article) => {
      if (article.tags) {
        article.tags.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
      return counts;
    }, {});
  }, []); // Empty dependency array as articles is imported

  // Memoize handlers to prevent unnecessary re-renders
  const handleSearch = useCallback((userQuery) => {
    setSearchQuery(userQuery);
  }, [setSearchQuery]);

  const handleFilterChosen = useCallback((userQuery) => {
    setFilterQuery(userQuery);
  }, [setFilterQuery]);

  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(prevTag => prevTag?.id === tag.id ? null : tag);
  }, [setSelectedTag]);

  return (
    <main 
    className='min-h-screen text-white py-4 md:py-8 px-4 md:px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300'
    role="main"
    aria-label="Tags page"
  >
    <div className='mb-6'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Tags</h1>
      <SearchInput 
        onSearchChange={handleSearch} 
        placeholderText="Search Tags" 
        classNames="w-full" 
        aria-label="Search tags"
      />
    </div>
    
    <div className='mb-6 overflow-x-auto'>
      <TagFilterTab 
        onChosenFilter={handleFilterChosen} 
        currentFilter={filterQuery}
        aria-label="Filter tags"
      />
    </div>
    
    {filteredTags.length === 0 ? (
      <div 
        className='flex items-center justify-center py-12'
        role="status"
        aria-live="polite"
      >
        <p className='text-gray-400'>No tags found matching your search.</p>
      </div>
    ) : (
      <div 
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
        role="list"
        aria-label="List of tags"
      >
        {filteredTags.map((item) => (
          <MemoizedTagCard 
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            questions={tagCounts[item.title] || 0}
            isSelected={selectedTag?.id === item.id}
            onSelect={() => handleTagSelect(item)}
            aria-label={`Tag: ${item.title}, ${tagCounts[item.title] || 0} questions`}
          />
        ))}
      </div>
    )}
  </main>
  )
}

export default Tags