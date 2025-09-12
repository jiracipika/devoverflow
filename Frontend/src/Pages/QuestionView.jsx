import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'
import articles from '../assets/FakeData.js'
import Tag from '../Components/Tag.jsx'
import { Link, useParams } from 'react-router-dom'
import PostAComment from '../Components/PostAComment.jsx'
import LikeIcon from '../assets/Icons/like-icon.svg';

const QuestionView = () => {

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  let params = useParams();

  useEffect(()=> {
    const fetchArticle = () => {
      setIsLoading(true);
      const data = articles.find(x => x.id == params.id);
      if (!data) {
        setNotFound(true);
      } else {
        setArticle(data);
        // Check if user has already liked this question
        const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '{}');
        if (likedQuestions[params.id]) {
          setHasLiked(true);
        }
      }
      setIsLoading(false);
    };
    
    fetchArticle();
  }, [params.id])

  const handleLike = () => {
    if (!article) return;

    const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '{}');
    
    if (hasLiked) {
      // Unlike the question
      setArticle(prev => ({
        ...prev,
        likes: Math.max(0, prev.likes - 1)
      }));
      delete likedQuestions[params.id];
      setHasLiked(false);
    } else {
      // Like the question
      setArticle(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
      likedQuestions[params.id] = true;
      setHasLiked(true);
    }
    
    localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
  };

  const handleCommentSubmit = async (commentText) => {
    if (!article) return;

    // Update the article's comments in state
    const newComment = {
      comment: commentText,
      author: "Current User", // You would get this from auth state
      date: "just now"
    };

    // Create a new copy of the article with the new comment
    const updatedArticle = {
      ...article,
      comments: [...article.comments, newComment]
    };

    // Update the state
    setArticle(updatedArticle);

    // In a real app, you would make an API call here
    console.log("Submitting...")
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
      newComment
    })
      .then(response => {
        console.log(response.data);
        console.log("Sending Done")
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleShare = async () => {
    const shareData = {
      title: article?.title || 'Check out this question',
      text: article?.content?.substring(0, 100) + '...' || 'Interesting question I found',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // If clipboard API fails, show a prompt with the link
      if (err.name !== 'AbortError') {
        prompt('Copy this link:', window.location.href);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0A0B10] to-black">
        <div className="text-white text-xl">Loading question...</div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0A0B10] to-black p-6">
        <h1 className="text-3xl font-bold text-white mb-4">Question Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">The question you're looking for doesn't exist or may have been removed.</p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white p-6 max-h-fit w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black'>
      <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>
      <div className='flex gap-3 py-4 text-gray-400'>
        <h3>Asked {article.asked}</h3>
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 ${hasLiked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
        >
          <img 
            src={LikeIcon} 
            alt={hasLiked ? 'Unlike' : 'Like'} 
            className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
          />
          {article.likes} {article.likes === 1 ? 'Like' : 'Likes'}
        </button>
        <h4>{article.views} Views</h4>
      </div>

      <div className='mb-6'>
        <div className='flex flex-wrap gap-2 mb-3'>
          {
              article.tags ? article.tags.map((item) =>{ //
                  return (<Tag text={item}/>)
              })
              :
              <Tag text={"hello"}/>
              
          }
        </div>

        <div className='flex items-center gap-2 justify-self-end text-sm text-gray-400'>
          <p>Asked By</p>
          <Link to={`/user/${article.author}`} className="text-white font-semibold text-sm sm:text-base hover:underline">{article.author}</Link>
        </div>
      </div>

      <div className='prose prose-invert max-w-none'>
        <p className='text-lg leading-relaxed'>{article.content}</p>
      </div>

      
      <div className='py-4'>
        <h2 className='text-2xl font-semibold mb-4'>Comments</h2>
        <div className='space-y-6'>
          {article.comments.map((comment, index) => (
            <div key={index} className='bg-[#1A1B20] rounded-lg p-6 transition-all duration-200 hover:bg-[#202128]'>
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium'>{comment.author.charAt(0).toUpperCase()}</div>
                    <div>
                      <Link to={`/user/${comment.author}`} ><p className='font-medium'>{comment.author}</p></Link>
                      <p className='text-sm text-gray-400'>Commented {comment.date || 'today'}</p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button onClick={handleShare} className='text-sm text-blue-400 hover:text-blue-500 transition-colors'>Share</button>
                </div>
              </div>
              <div className='prose prose-sm prose-invert max-w-none'>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-8 gap-4'>
        <button 
          onClick={() => setShowCommentForm(!showCommentForm)}
          className='bg-custom-gradient p-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30'
        >
          Post a Comment
        </button>
      </div>

      {showCommentForm && (
        <div className='mt-8'>
          <PostAComment onCommentSubmit={handleCommentSubmit} />
        </div>
      )}
    </div>
  )
}

export default QuestionView