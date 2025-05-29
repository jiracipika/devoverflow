import React from 'react'
import { Link } from 'react-router-dom'
import CollectionCard from '../Components/CollectionCard';
import collections from '../assets/CollectionsData.js'


const Collections = () => {

  //console.log(collections)

  return (
    <div className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
    <h2 className="text-2xl font-bold mb-6">Saved Questions</h2>
    {collections.map((item) => (
      (<Link to={`/question/${item.id}`}><CollectionCard key={item.id} {...item}/></Link>)

    ))}
    </div>
  )
}

export default Collections