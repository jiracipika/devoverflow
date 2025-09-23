import React from 'react';

const BlogCard = ({ post }) => {
  return (
    <article className="bg-dark-200 dark:bg-gray-500 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform h-full flex flex-col">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-3 py-1 bg-dark-300 dark:bg-gray-400 text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
        <p className="text-white mb-4 flex-grow">{post.description}</p>
        <div className="flex items-center gap-3 mt-auto">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-white font-medium">{post.author.name}</p>
            <p className="text-sm text-white">{post.date}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
