import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BlogGrid from './components/BlogGrid';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const samplePosts = [
    {
      id: 1,
      image: 'https://source.unsplash.com/random/800x600?technology',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and start building your first app with this comprehensive guide for beginners.',
      author: {
        name: 'Jane Doe',
        avatar: 'https://source.unsplash.com/random/100x100?portrait'
      },
      date: 'May 15, 2024',
      tags: ['React', 'JavaScript', 'Web Development']
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/random/800x600?coding',
      title: 'Advanced TypeScript Techniques',
      excerpt: 'Dive deep into TypeScript with these advanced techniques that will take your coding skills to the next level.',
      author: {
        name: 'John Smith',
        avatar: 'https://source.unsplash.com/random/100x100?man'
      },
      date: 'May 18, 2024',
      tags: ['TypeScript', 'JavaScript', 'Programming']
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/random/800x600?design',
      title: 'Mastering CSS Grid Layout',
      excerpt: 'Unlock the power of CSS Grid Layout and create complex, responsive designs with ease.',
      author: {
        name: 'Emily Chen',
        avatar: 'https://source.unsplash.com/random/100x100?woman'
      },
      date: 'May 20, 2024',
      tags: ['CSS', 'Web Design', 'Front-end']
    },
  ];

  const handleAuthSuccess = (userData) => {
    // For demo purposes, let's assume the first user is an admin
    const userWithRole = { ...userData, role: userData.email === 'test@example.com' ? 'admin' : 'user' };
    setUser(userWithRole);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
  };


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header 
          user={user} 
          onAuthClick={() => setShowAuth(true)} 
          onLogout={handleLogout}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<BlogGrid posts={samplePosts} />} />
            <Route 
              path="/admin/*" 
              element={
                user && user.role === 'admin' 
                  ? <AdminDashboard user={user} /> 
                  : <Navigate to="/" replace />
              } 
            />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
        <Modal isOpen={showAuth} onClose={() => setShowAuth(false)}>
          <Auth 
            onClose={() => setShowAuth(false)} 
            onAuthSuccess={handleAuthSuccess}
          />
        </Modal>
      </div>
    </Router>
  );
};

export default App;