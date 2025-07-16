import React, {useState, useMemo} from 'react'
import SearchInput from '../Components/SearchInput';
import UserDataInfo from '../assets/UserData';
import CommunityDatabyTags from '../assets/CommunityDatabyTags';
import CommunityCard from '../Components/CommunityCards';

const CommunitiesByTags = () => {
    const [searchQuery,setSearchQuery] = useState("")
    const [filteredCards, setFilteredCards] = useState(CommunityDatabyTags)

    const userCounts = useMemo(() => {
        const counts = {};
        UserDataInfo.forEach(user =>{
            console.log(user.tags)
            if (user.tags) {
                user.tags.forEach(tag => {
                    counts[tag] = (counts[tag] || 0) + 1;
                })
            }
        })
        return counts
      }, []);
      
    const handleSearch = (userquery) =>{
        setSearchQuery(userquery)
        const filtered = CommunityDatabyTags.filter(name =>
            name.TagName.toLowerCase().includes(userquery.toLowerCase())
        );
        setFilteredCards(filtered)
        console.log(userquery)
    }
    return (
        <section className='min-h-screen text-white py-4 md:py-8 gap-4 md:gap-8 flex flex-col px-4 md:px-8 max-h-fit w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <SearchInput onSearchChange={handleSearch} placeholderText={"Search Communities by Tag"} classNames={"w-full mx-auto"} />
            <div className='grid grid-cols-4 max-[1400px]:grid-cols-2 max-[1085px]:grid-cols-1 gap-4 md:gap-6'>
            {filteredCards.map((item, index) =>{
                return (
                <CommunityCard key={index} id={index} TagName={item.TagName} Users={userCounts[item.TagName] || 0}/>)
            })}  
            </div>
        </section>
      )
}

export default CommunitiesByTags