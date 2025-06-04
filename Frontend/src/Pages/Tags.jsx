import React, {useState, useEffect} from 'react'
import SearchInput from '../Components/SearchInput';
import TagCard from '../Components/TagCard.jsx';
import TagCardInfo from '../assets/TagSampleData.js';
import TagFilterTab from '../Components/TagFilterTab.jsx';

const Tags = () => {

    const [searchQuery,setSearchQuery] = useState("")
    const [filterQuery, setFilterQuery] = useState("")
    const [filteredTags, setFilteredTags] = useState(TagCardInfo);
    const [selectedTag, setSelectedTag] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSearch = (userquery) =>{
        setSearchQuery(userquery)
        const filtered = TagCardInfo.filter(tag => 
            tag.title.toLowerCase().includes(userquery.toLowerCase())
        );
        setFilteredTags(filtered)
        console.log(userquery)
      }
    
    const handleFilterChosen = (userquery) =>{
        setFilterQuery(userquery)
        if (userquery == "Popular"){
            filteredTags.sort((a, b) => b.questions - a.questions);
        }
        else if (userquery == "Name"){
            filteredTags.sort((a, b) => a.title.localeCompare(b.title));
        }
      }

    const handleDelete = () => {
        if (!selectedTag) return; // Prevent deletion if no tag is selected
        // Create a new array without the selected tag
        const updatedTags = filteredTags.filter(tag => tag !== selectedTag);
        setFilteredTags(updatedTags);
        setSelectedTag(null); // Clear selection after deletion
    }

    // For Admin Check
    //useEffect(() => {
        // Example using localStorage - replace with your actual auth system
    //    const user = JSON.parse(localStorage.getItem('user') || '{}');
     //   setIsAdmin(user.role === 'admin');
    //}, []);

    return (
        <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <SearchInput onSearchChange={handleSearch} placeholderText={"Search by Tag Name"} classNames={"w-[100%] p-2 rounded-lg"} />
            <h1>Tags</h1>
            <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
            <div className='flex justify-between'>
                <TagFilterTab onChosenFilter={handleFilterChosen}/>
                {isAdmin && (
                    <button onClick={handleDelete} className='bg-custom-gradient p-4 rounded-lg font-semibold w-[15%] max-[1435px]:text-[15px] max-[1435px]:p-3'>Delete Tag</button>
                )}
            </div>
            <div className='grid grid-cols-3 flex gap-2'>
            {filteredTags.map((item, index) =>{
        return (
            <TagCard onSelect={() => setSelectedTag(item)} isSelected={selectedTag === item} id={index} title={item.title} description={item.description} questions={item.questions}/>)

      })}    
            </div>
        </section>
    )
}

export default Tags