import React, { useState, useEffect } from 'react';
import articles from '../assets/FakeData.js'
import Tag from '../Components/Tag.jsx'
import { useParams } from 'react-router-dom'

const QuestionView = () => {

  const [article, setArticle] = useState(null);

  let params = useParams();

  useEffect(()=> {
    const data = articles.find(x => x.id == params.id);
    setArticle(data);
  }, [])

  return (
    <div className='min-h-screen text-white p-6 max-h-fit w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      {article && (
        <>
        <h1>{article.title}</h1>
        <div className='flex gap-3 py-4'>
          <h3>Asked {article.asked}</h3>
          <h4>{article.likes} Likes</h4>
          <h4>{article.views} Views</h4>
        </div>

        <div className='py-4'>
          <p>{article.content}</p>
        </div>


        <div className=''>
          <div className='flex flex-wrap gap-2 mb-3'>
            {
                article.tags ? article.tags.map((item) =>{ //
                    return (<Tag text={item}/>)
                })
                :
                <Tag text={"hello"}/>
                
            }
          </div>

          <div className='flex gap-2 justify-self-end'>
            <p>Asked By</p>
            <p>{article.author}</p>
          </div>
        </div>

        
        <div className='py-4'>
          <h2>Comments</h2>
          <div className='py-8'>
            {article.comments.map((comment) => (
              <>
              <p>{comment.comment}</p>
              <div className='py-10'>
                <div className='justify-self-end'>
                  <p>Answered by</p>
                  <p>{comment.author}</p>
                </div>
                <div className='flex gap-2'>
                  <p>Share</p>
                  <p>Follow</p>
                </div>
              </div>
              </>
            ))}
          </div>
        </div>
        </>
      )}

    </div>
  )
}

export default QuestionView