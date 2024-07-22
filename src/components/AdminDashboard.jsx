
// components/AdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import BlogPostManagement from './Dashboard/BlogPostManagement';
import TagManagement from './Dashboard/Tagmanagement';
import UserStats from './Dashboard/UserStats';
import BlogPostEditor from './BlogPostEditor';

const AdminDashboard = ({ user }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/admin/posts', name: 'Blog Posts', icon: '📝' },
    { path: '/admin/tags', name: 'Tags', icon: '🏷️' },
    { path: '/admin/stats', name: 'User Stats', icon: '📊' },
    { path: '/admin/new-post', name: 'New Post', icon: '✏️' },
  ];

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
          <p className="text-sm text-gray-600">Welcome, {user.name}</p>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                location.pathname === item.path ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md lg:hidden">
          <div className="p-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Routes>
            <Route path="posts" element={<BlogPostManagement user={user} />} />
              <Route path="tags" element={<TagManagement />} />
              <Route path="stats" element={<UserStats />} />
              <Route path="new-post" element={<BlogPostEditor />} />
              <Route path="edit-post/:id" element={<BlogPostEditor />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;