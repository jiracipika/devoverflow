import React from 'react'
import SearchInput from '../Components/SearchInput'
import TagCard from '../Components/TagCard.jsx'
import TagFilterTab from '../Components/TagFilterTab.jsx'
import { useTags } from '../context/TagsContext';

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

  const handleSearch = (userquery) => {
    setSearchQuery(userquery)
  }

  const handleFilterChosen = (userquery) => {
    setFilterQuery(userquery)
  }

  return (
    <section className='min-h-screen text-white py-4 md:py-8 px-4 md:px-8 w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <div className='mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Tags</h1>
        <SearchInput 
          onSearchChange={handleSearch} 
          placeholderText={"Search Tags"} 
          classNames={"w-full"} 
        />
      </div>
      
      <div className='mb-6 overflow-x-auto'>
        <TagFilterTab onChosenFilter={handleFilterChosen} />
      </div>
      
      {filteredTags.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-gray-400'>No tags found matching your search.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredTags.map((item, index) => (
            <TagCard 
              key={`${item.id}-${index}`}
              id={item.id}
              title={item.title}
              description={item.description}
              questions={item.questions}
              isSelected={selectedTag === item}
              onSelect={() => setSelectedTag(item)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Tags