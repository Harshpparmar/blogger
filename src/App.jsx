
// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BlogGrid from './components/BlogGrid';
import BlogPostPage from './components/BlogPostPage';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import BlogPostEditor from './components/BlogPostEditor';
import { getAllPosts } from './services/blogService';

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
            <Route path="/" element={<BlogGrid posts={posts} />} />
            <Route path="/blog/:id" element={<BlogPostPage posts={posts} />} />
            <Route
              path="/admin/*"
              element={
                user && user.role === 'admin'
                  ? <AdminDashboard user={user} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/dashboard/*"
              element={
                user
                  ? <UserDashboard user={user} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/new-post"
              element={
                user
                  ? <BlogPostEditor user={user} />
                  : <Navigate to="/" replace />
              }
            />
            <Route
              path="/edit-post/:id"
              element={
                user
                  ? <BlogPostEditor user={user} />
                  : <Navigate to="/" replace />
              }
            />
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