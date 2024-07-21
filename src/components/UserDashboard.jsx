// components/UserDashboard.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import BlogPostManagement from './Dashboard/BlogPostManagement';

const UserDashboard = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <nav className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="text-blue-500 hover:underline">My Posts</Link>
          </li>
          <li>
            <Link to="/new-post" className="text-blue-500 hover:underline">Create New Post</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<BlogPostManagement user={user} />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;