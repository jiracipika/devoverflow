import React, { useState, useEffect }  from 'react';
import { useParams, Link } from 'react-router-dom';
import articles from '../assets/FakeData.js'
import ExpandableCard from '../Components/ExpandableCard.jsx';
import { useTags } from '../context/TagsContext.jsx';

const TagSection = () => {
    const { id } = useParams();
    console.log(id)
    const { filteredTags } = useTags();
    console.log(filteredTags)
    
    // Find the tag from filteredTags instead of original TagCardInfo
    const selectedData = filteredTags.find((data) => data.id === parseInt(id));
    console.log(selectedData)

    const findArticlesByTag = (tags) => {
        return articles.filter(article => 
            article.tags.some(tag => tags.includes(tag))
        );
    }

    const filteredArticles = findArticlesByTag(selectedData.title);

    if (!selectedData) {
        return <p>Tag not found.</p>;
    }

    return (
        <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <h1 className="text-2xl font-bold mb-2">{selectedData.title}</h1>
            <p>{selectedData.description}</p>
            
            {filteredArticles.map((item) =>{
                return (
                    <ExpandableCard key={item.id} {...item}/>
                )
            })}
            
            <Link to="/tags" className="mt-4 inline-block text-blue-500 underline">Back to Tag List</Link>
        </section>
    )
}

export default TagSection;