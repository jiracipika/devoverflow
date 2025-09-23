import React, { useState } from 'react';
import PostAComment from './PostAComment';
import { Link } from 'react-router-dom';

const CommentsSection = ({ comments, onCommentSubmit }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleCommentSubmit = (commentText) => {
    onCommentSubmit(commentText);
    setShowCommentForm(false);
  };

  return (
    <div className='py-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Comments</h2>
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm'
        >
          {showCommentForm ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {showCommentForm && (
        <div className='mb-6'>
          <PostAComment onSubmit={handleCommentSubmit} />
        </div>
      )}

      <div className='space-y-6'>
        {comments.map((comment, index) => (
          <div key={index} className='bg-[#1A1B20] dark:bg-gray-400 rounded-lg p-6 transition-all duration-200 hover:bg-[#202128]'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium'>
                    {comment.author?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <Link to={`/user/${comment.author}`}>
                      <p className='font-medium'>{comment.author || 'Unknown User'}</p>
                    </Link>
                    <p className='text-sm text-gray-400'>
                      Commented {comment.date || 'recently'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className='text-gray-300'>{comment.comment}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className='text-gray-400 text-center py-4'>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
