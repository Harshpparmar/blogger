
// components/Dashboard/BlogPostManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, deletePost, getUserPosts } from '../../services/blogService';

const BlogPostManagement = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = user.role === 'admin' ? await getAllPosts() : await getUserPosts(user.id);
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{user.role === 'admin' ? 'All Blog Posts' : 'My Blog Posts'}</h2>
        <Link
          to="/new-post"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Post
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {posts.map(post => (
                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{post.title}</td>
                  <td className="py-3 px-6 text-left">{post.date}</td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/edit-post/${post.id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                    <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogPostManagement;