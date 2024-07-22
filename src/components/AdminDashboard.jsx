// // components/AdminDashboard.jsx
// import React, { useState } from 'react';
// import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import BlogPostManagement from './Dashboard/BlogPostManagement';
// import TagManagement from './Dashboard/Tagmanagement';
// import UserStats from './Dashboard/UserStats';

// const AdminDashboard = ({ user }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
//         <h2 className="text-2xl font-semibold text-center">Admin Dashboard</h2>
//         <nav>
//           <Link to="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Blog Posts</Link>
//           <Link to="/admin/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Tags</Link>
//           <Link to="/admin/stats" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User Stats</Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex justify-between items-center p-4 bg-white border-b">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
//           <Routes>
//             <Route path="posts" element={<BlogPostManagement />} />
//             <Route path="tags" element={<TagManagement />} />
//             <Route path="stats" element={<UserStats />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React, { useState, useRef, useEffect } from 'react';
// import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
// import BlogPostManagement from './Dashboard/BlogPostManagement';
// import TagManagement from './Dashboard/Tagmanagement';
// import UserStats from './Dashboard/UserStats';

// const AdminDashboard = ({ user }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const location = useLocation();

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener('mousedown', handleOutsideClick);
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isSidebarOpen]);

//   // Close sidebar when navigating to a new page
//   useEffect(() => {
//     setIsSidebarOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
//       >
//         <h2 className="text-2xl font-semibold text-center">Admin Dashboard</h2>
//         <nav>
//           <Link to="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Blog Posts</Link>
//           <Link to="/admin/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Tags</Link>
//           <Link to="/admin/stats" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User Stats</Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex justify-between items-center p-4 bg-white border-b md:pl-72">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 md:pl-72">
//           <Routes>
//             <Route path="posts" element={<BlogPostManagement />} />
//             <Route path="tags" element={<TagManagement />} />
//             <Route path="stats" element={<UserStats />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




// import React, { useState, useRef, useEffect } from 'react';
// import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
// import BlogPostManagement from './Dashboard/BlogPostManagement';
// import TagManagement from './Dashboard/Tagmanagement';
// import UserStats from './Dashboard/UserStats';
// import BlogPostEditor from './BlogPostEditor';

// const AdminDashboard = ({ user }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const location = useLocation();

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   // Close sidebar when clicking outside
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener('mousedown', handleOutsideClick);
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isSidebarOpen]);

//   // Close sidebar when navigating to a new page
//   useEffect(() => {
//     setIsSidebarOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
//       >
//         <h2 className="text-2xl font-semibold text-center">Admin Dashboard</h2>
//         <nav>
//           <Link to="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Blog Posts</Link>
//           <Link to="/admin/new-post" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">New Post</Link>
//           <Link to="/admin/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Tags</Link>
//           <Link to="/admin/stats" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">User Stats</Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex justify-between items-center p-4 bg-white border-b md:pl-72">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
//         </header>
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 md:pl-72">
//           <Routes>
//             <Route path="posts" element={<BlogPostManagement />} />
//             <Route path="new-post" element={<BlogPostEditor />} />
//             <Route path="tags" element={<TagManagement />} />
//             <Route path="stats" element={<UserStats />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

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