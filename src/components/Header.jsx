// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Header = ({ user, onAuthClick, onLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-gray-800 text-white">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-4" />
//           <h1 className="text-xl font-bold">My Blog</h1>
//         </div>
//         <nav className="hidden md:flex space-x-4 items-center">
//           <Link to="/" className="hover:text-gray-300">Home</Link>
//           <Link to="/about" className="hover:text-gray-300">About</Link>
//           <Link to="/blog" className="hover:text-gray-300">Blog</Link>
//           <Link to="/contact" className="hover:text-gray-300">Contact</Link>
//           {user ? (
//             <div className="flex items-center space-x-2">
//               <span>Welcome, {user.name}</span>
//               {user.role === 'admin' && (
//               <Link to="/admin" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors">
//                 Admin Dashboard
//               </Link>
//             )}
//               <button
//                 onClick={onLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={onAuthClick}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
//             >
//               Login / Register
//             </button>
//           )}
//         </nav>
//         <button
//           className="md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
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
//               <Link to="/admin" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors w-full mt-2">
//                 Admin Dashboard
//               </Link>
//             )}
//               <button
//                 onClick={onLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors w-full"
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


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onAuthClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-2">
          <span>Welcome, {user.name}</span>
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={onAuthClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
      >
        Login / Register
      </button>
    );
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://img.icons8.com/?size=100&id=81252&format=png&color=000000" alt="Logo" className="h-8 w-auto mr-4" />
          <h1 className="text-xl font-bold">My Blog</h1>
        </div>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          {renderAuthButtons()}
        </nav>
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700 px-4 py-2">
          <Link to="/" className="block py-2 hover:text-gray-300">Home</Link>
          <Link to="/about" className="block py-2 hover:text-gray-300">About</Link>
          <Link to="/blog" className="block py-2 hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="block py-2 hover:text-gray-300">Contact</Link>
          {user ? (
            <div className="py-2">
              <span className="block mb-2">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors block text-center mt-2"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors w-full mt-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors w-full mt-2"
            >
              Login / Register
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;

