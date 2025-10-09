import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'
import articles from '../assets/FakeData.js'
import Tag from '../Components/Tag.jsx'
import { Link, useParams } from 'react-router-dom'
import LikeIcon from '../assets/Icons/like-icon.svg';
import CommentsSection from '../Components/CommentsSection';

const QuestionView = () => {

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  
  let params = useParams();

  useEffect(() => {
    const fetchArticle = () => {
      setIsLoading(true);
      try {
        const data = articles.find(x => x.id == params.id);
        if (!data) {
          setNotFound(true);
        } else {
          setArticle(data);
          // Check if user has already liked this question
          try {
            const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '{}');
            if (likedQuestions[params.id]) {
              setHasLiked(true);
            }
          } catch (e) {
            console.error('Error reading from localStorage:', e);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [params.id]);

  // In handleLike function
  const handleLike = async () => {
    if (!article) {
      console.error('No article data available');
      return;
    }

    try {
      const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '{}');
      const newLikedState = !hasLiked;
    
      // Optimistic UI update
      const previousArticleState = { ...article };
      setArticle(prev => ({
        ...prev,
        likes: newLikedState ? prev.likes + 1 : Math.max(0, prev.likes - 1)
      }));

      try {
        const response = await axios.post(
          `/questions/${params.id}/like`,
          { like: newLikedState },
          {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Update local storage only after successful API call
        const updatedLikes = { ...likedQuestions };
        if (newLikedState) {
          updatedLikes[params.id] = true;
        } else {
          delete updatedLikes[params.id];
        }
        localStorage.setItem('likedQuestions', JSON.stringify(updatedLikes));
        setHasLiked(newLikedState);
      } else {
        throw new Error(`API returned status ${response.status}`);
      }
    } catch (apiError) {
      // Revert UI if API call fails
      console.error('Error updating like:', apiError);
      setArticle(previousArticleState);
      // Show user-friendly error message
      // You might want to use a toast notification here instead of alert
      alert('Failed to update like. Please check your connection and try again.');
    }
  } catch (error) {
    console.error('Error in like operation:', error);
    // Fallback error handling
    alert('An unexpected error occurred. Please try again later.');
  }
};

  // In handleCommentSubmit function
  const handleCommentSubmit = async (commentText) => {
    if (!article || !commentText?.trim()) {
      console.error('No article data or empty comment');
      return;
    }

    const trimmedComment = commentText.trim();
    const tempId = `temp-${Date.now()}`; // For optimistic updates

    // Optimistic UI update
    const newComment = {
      id: tempId,
      comment: trimmedComment,
      author: "Current User", // Should come from auth context
      date: "just now",
      isOptimistic: true
    };

    // Update UI immediately
    setArticle(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));

    try {
      const response = await axios.post(
        '/api/comments',
        { 
          questionId: params.id,
          comment: trimmedComment 
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Replace the optimistic comment with the server response
        setArticle(prev => ({
          ...prev,
          comments: prev.comments.map(comment => 
            comment.id === tempId 
              ? { ...response.data, isOptimistic: false } 
              : comment
          )
        }));
      } else {
        throw new Error(`API returned status ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    
      // Remove the optimistic comment on error
      setArticle(prev => ({
        ...prev,
        comments: prev.comments.filter(comment => comment.id !== tempId)
      }));

      // Show user-friendly error message
      // Consider using a toast notification instead of alert
      alert('Failed to post comment. Please try again.');
    }
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300 p-6">
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
    <div 
      className='min-h-screen text-white p-6 max-h-fit w-full lg:w-[calc(100%-330px)] bg-gradient-to-r from-[#0A0B10] to-black dark:bg-gradient-to-r dark:from-gray-300 dark:to-gray-300'
      role="main"
      aria-label="Question details"
    >
      <h1 className='text-4xl font-bold mb-4' tabIndex="-1">{article.title}</h1>
      <div className='flex gap-3 py-4 text-gray-400' role="contentinfo" aria-label='Question metadata'>
        <span>Asked <time dateTime={article.askedDateTime || ''}>{article.asked}</time></span>
        <button 
          onClick={handleLike}
          aria-pressed={hasLiked}
          aria-label={hasLiked ? 'Unlike this question' : 'Like this question'}
          className={`flex items-center gap-1 ${hasLiked ? 'text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
        >
          <img 
            src={LikeIcon} 
            alt="" 
            className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
          <span aria-live="polite">
            {article.likes} {article.likes === 1 ? 'Like' : 'Likes'}
          </span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-1 text-gray-400 hover:text-blue-300"
          aria-label="Share this question"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
            />
          </svg>
          <span>Share</span>
        </button>
        <span>{article.views} Views</span>
      </div>

      <div className='mb-6'>
        <div className='flex flex-wrap gap-2 mb-3' role="list" aria-label="Question tags">
          {article.tags ? 
            article.tags.map((item, index) => (
              <Tag key={index} text={item} />
            )) : 
            <Tag text="hello" />
          }
        </div>

        <div className='flex items-center gap-2 justify-self-end text-sm text-gray-400' aria-label="Question author">
          <span>Asked By</span>
          <Link 
            to={`/user/${article.author}`} 
            className="text-white font-semibold text-sm sm:text-base hover:underline"
            aria-label={`View profile of ${article.author}`}
          >
            {article.author}
          </Link>
        </div>
      </div>

      <article className='prose prose-invert max-w-none' aria-labelledby="question-title">
        <h2 id="question-title" className="sr-only">Question</h2>
        <p className='text-lg leading-relaxed'>{article.content}</p>
      </article>

      <section aria-label="Comments">
        <CommentsSection 
          comments={article.comments || []} 
          onCommentSubmit={handleCommentSubmit} 
        />
      </section>
    </div>
  )
}

export default QuestionView