// import React from 'react';
// import { Link } from 'react-router-dom';
// import BlogPostCard from './BlogPostCard';

// const BlogGrid = ({ posts }) => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {posts.map((post) => (
//           <Link to={`/blog/${post.id}`} key={post.id}>
//             <BlogPostCard
//               image={post.image}
//               title={post.title}
//               excerpt={post.excerpt}
//               author={post.author}
//               date={post.date}
//               tags={post.tags}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogGrid;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';
import { DarkModeContext } from '../DarkModeContext';

const BlogGrid = ({ posts }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="xl:container m-auto px-6 md:px-12 xl:px-6">
        <div className="mb-12 space-y-2 text-center">
          <h2 className={`text-3xl font-bold md:text-4xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Sharing is Caring
          </h2>
          <p className={`lg:mx-auto lg:w-6/12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia
            aliquid explicabo? Excepturi, voluptate?
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id}>
              <BlogPostCard
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                readMoreLink={`/blog/${post.id}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;