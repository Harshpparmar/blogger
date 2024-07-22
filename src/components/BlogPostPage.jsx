// BlogPostPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPostPage = ({ posts }) => {
  const { id } = useParams();
  
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;
  }

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to all posts</Link>
      <article className="max-w-3xl mx-auto">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-4">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-gray-600 text-sm">{post.date}</p>
          </div>
        </div>
        <div className="mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{post.excerpt}</p>
        {/* In a real application, you'd have the full content here */}
        <p className="text-gray-700 leading-relaxed">
          This is where the full content of the blog post would go. In a real application, 
          you'd fetch the complete post data from your backend API and display it here.
        </p>
      </article>
    </div>
  );
};

export default BlogPostPage;