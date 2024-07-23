import React from 'react';

const BlogPostCard = ({ image, title, excerpt, readMoreLink }) => {
  return (
    <div className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt="article cover"
          loading="lazy"
          className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-6 relative">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
          {excerpt}
        </p>
        <a className="inline-block" href={readMoreLink}>
          <span className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">Read more</span>
        </a>
      </div>
    </div>
  );
};

export default BlogPostCard;



// import React from 'react';

// const BlogPostCard = ({ image, title, excerpt, author, date, tags }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
//       <img 
//         src={image} 
//         alt={title} 
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-indigo-600 transition-colors duration-300">
//           {title}
//         </h2>
//         <p className="text-gray-600 mb-4">{excerpt}</p>
//         <div className="flex items-center mb-4">
//           <img 
//             src={author.avatar} 
//             alt={author.name} 
//             className="w-10 h-10 rounded-full mr-4"
//           />
//           <div>
//             <p className="text-sm font-semibold text-gray-800">{author.name}</p>
//             <p className="text-xs text-gray-500">{date}</p>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {tags.map((tag, index) => (
//             <span 
//               key={index} 
//               className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostCard;
// import React from 'react';

// const BlogPostCard = ({ image, title, excerpt, readMoreLink }) => {
//   return (
//     <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 bg-opacity-10 shadow-2xl shadow-gray-600/10 dark: text-white">
//       <div className="relative overflow-hidden rounded-xl">
//         <img
//           src={image}
//           alt="article cover"
//           loading="lazy"
//           className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
//         />
//       </div>
//       <div className="mt-6 relative ">
//         <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
//           {title}
//         </h3>
//         <p className="mt-6 mb-8 text-gray-600 dark:text-white">
//           {excerpt}
//         </p>
//         <a className="inline-block" href={readMoreLink}>
//           <span className="text-primary hover:text-blue-500">Read more</span>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BlogPostCard;