import React from 'react';
import BlogPostCard from './BlogPostCard';

const BlogGrid = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogPostCard
            key={index}
            image={post.image}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
            date={post.date}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;