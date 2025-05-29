import React, {useState} from 'react'
import {useParams, Link} from "react-router-dom";
import SearchInput from '../Components/SearchInput';
import UserCard from '../Components/UserCard';
import UserDataInfo from '../assets/UserData';

const Communities = () => {

  const [searchQuery,setSearchQuery] = useState("")
  
  const handleSearch = (userquery) =>{
    setSearchQuery(userquery)
    console.log(userquery)
  }

  const { TagName } = useParams();

  const filteredUsers = UserDataInfo.filter(user => user.tags.includes(TagName));

  return (
    <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <SearchInput onSearchChange={handleSearch} placeholderText={"Search by Username"} classNames={"w-full"} />
      <div className='grid grid-cols-3 flex gap-2'>
      {filteredUsers.map((item) =>{
        return (
        <Link to={`otherUserProfile/${item.id}`} >
            <UserCard key={item.id} {...item}/>
        </Link>)

      })}  
      </div>
      <Link to="/communitiesbytags" className="mt-4 inline-block text-blue-500 underline">Back to Tag List</Link>
    </section>
  )
}

export default Communities