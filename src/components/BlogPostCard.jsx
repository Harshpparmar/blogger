import React from 'react';

const BlogPostCard = ({ image, title, excerpt, author, date, tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center mb-4">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{author.name}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;