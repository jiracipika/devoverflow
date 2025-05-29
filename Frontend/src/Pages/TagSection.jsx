import React from 'react';
import { useParams, Link }  from 'react-router-dom';
import TagCardInfo from '../assets/TagSampleData.js';
import articles from '../assets/FakeData.js'
import ExpandableCard from '../Components/ExpandableCard.jsx';

const TagSection = () => {
    const { id } = useParams(); // Get the ID from the URL
    const selectedData = TagCardInfo.find((data) => data.id === parseInt(id)); // Find title by ID
    //console.log(selectedData)

    const findArticlesByTag = (tags) => {
        return articles.filter(article => 
            article.tags.some(tag => tags.includes(tag))
        );
    }

    const filteredArticles = findArticlesByTag(selectedData.title);
    //console.log(filteredArticles);

    if (!selectedData) {
        return <p>Title not found.</p>;
    }
    return (
        <section className='min-h-screen text-white py-8 gap-8 flex flex-col px-8 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
            <h1 className="text-2xl font-bold mb-2">{selectedData.title}</h1>
            <p>{selectedData.description}</p>
            
            {filteredArticles.map((item) =>{
        return (<Link to={`question/${item.id}`}><ExpandableCard key={item.id} {...item}/></Link>)

      })}
            <Link to="/tags" className="mt-4 inline-block text-blue-500 underline">Back to Tag List</Link>
        </section>
        
    )
}

export default TagSection