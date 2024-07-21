import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/blogService';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post. Please try again later.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

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
        {/* TODO: Replace with full content when available */}
        <p className="text-gray-700 leading-relaxed">
          This is where the full content of the blog post would go. In a real application, 
          you'd fetch the complete post data from your backend API and display it here.
        </p>
      </article>
    </div>
  );
};

export default BlogPostPage;