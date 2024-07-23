
// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { DarkModeContext } from '../DarkModeContext';

// const Header = ({ user, onAuthClick, onLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const renderAuthButtons = () => {
//     if (user) {
//       return (
//         <div className="flex items-center space-x-2">
//           <span>Welcome, {user.name}</span>
//           {user.role === 'admin' && (
//             <Link
//               to="/admin"
//               className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
//             >
//               Admin Dashboard
//             </Link>
//           )}
//           <button
//             onClick={onLogout}
//             className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       );
//     }
//     return (
//       <button
//         onClick={onAuthClick}
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
//       >
//         Login / Register
//       </button>
//     );
//   };

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <img src="https://img.icons8.com/?size=100&id=81252&format=png&color=000000" alt="Logo" className="h-8 w-auto mr-4" />
//           <h1 className="text-xl font-bold">My Blog</h1>
//         </div>
//         <nav className="hidden md:flex space-x-4 items-center">
//           <Link to="/" className="hover:text-gray-300">Home</Link>
//           <Link to="/about" className="hover:text-gray-300">About</Link>
//           {/* <Link to="/blog" className="hover:text-gray-300">Blog</Link>
//           <Link to="/contact" className="hover:text-gray-300">Contact</Link> */}
//           {renderAuthButtons()}
//         </nav>
//         <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
//         {isDarkMode ? '☀️' : '🌙'}
//         </button>
//         <button
//           className="md:hidden"
//           onClick={toggleMenu}
//           aria-label="Toggle Menu"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
//       {isMenuOpen && (
//         <nav className="md:hidden bg-gray-700 px-4 py-2">
//           <Link to="/" className="block py-2 hover:text-gray-300">Home</Link>
//           <Link to="/about" className="block py-2 hover:text-gray-300">About</Link>
//           <Link to="/blog" className="block py-2 hover:text-gray-300">Blog</Link>
//           <Link to="/contact" className="block py-2 hover:text-gray-300">Contact</Link>
//           {user ? (
//             <div className="py-2">
//               <span className="block mb-2">Welcome, {user.name}</span>
//               {user.role === 'admin' && (
//                 <Link
//                   to="/admin"
//                   className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors block text-center mt-2"
//                 >
//                   Admin Dashboard
//                 </Link>
//               )}
//               <button
//                 onClick={onLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors w-full mt-2"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={onAuthClick}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors w-full mt-2"
//             >
//               Login / Register
//             </button>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';

const Header = ({ user, onAuthClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={onLogout}
            className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={onAuthClick}
        className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Login / Register
      </button>
    );
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto sm:h-10" src="https://img.icons8.com/?size=100&id=81252&format=png&color=000000" alt="Logo" />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">My Blog</span>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={toggleDarkMode}
              className="mr-4 bg-gray-200 dark:bg-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            {renderAuthButtons()}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-5">
            <button
              onClick={toggleDarkMode}
              className="mr-4 bg-gray-200 dark:bg-gray-600 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="ml-3 w-full">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;