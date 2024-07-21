// // src/services/blogService.js

// // Placeholder for API base URL
// const API_BASE_URL = '/api';

// // Placeholder function to fetch all posts
// export const getAllPosts = async () => {
//   // TODO: Replace with actual API call
//   console.log('Fetching all posts');
//   return [
//     {
//       id: 1,
//       image: 'https://source.unsplash.com/random/800x600?technology',
//       title: 'Getting Started with React',
//       excerpt: 'Learn the basics of React and start building your first app with this comprehensive guide for beginners.',
//       author: {
//         name: 'Jane Doe',
//         avatar: 'https://source.unsplash.com/random/100x100?portrait'
//       },
//       date: 'May 15, 2024',
//       tags: ['React', 'JavaScript', 'Web Development']
//     },
//     // ... other sample posts
//   ];
// };

// // Placeholder function to fetch a single post by ID
// export const getPostById = async (id) => {
//   // TODO: Replace with actual API call
//   console.log(`Fetching post with id ${id}`);
//   const allPosts = await getAllPosts();
//   return allPosts.find(post => post.id === parseInt(id));
// };

// // Placeholder function to create a new post
// export const createPost = async (postData) => {
//   // TODO: Replace with actual API call
//   console.log('Creating new post', postData);
//   return { id: Date.now(), ...postData };
// };

// // Placeholder function to update an existing post
// export const updatePost = async (id, postData) => {
//   // TODO: Replace with actual API call
//   console.log(`Updating post with id ${id}`, postData);
//   return { id, ...postData };
// };

// // Placeholder function to delete a post
// export const deletePost = async (id) => {
//   // TODO: Replace with actual API call
//   console.log(`Deleting post with id ${id}`);
//   return true;
// };


// src/services/blogService.js

// Placeholder for API base URL
const API_BASE_URL = '/api';

// Placeholder function to fetch all posts
export const getAllPosts = async () => {
  // TODO: Replace with actual API call
  console.log('Fetching all posts');
  return [
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
    // ... other sample posts
  ];
};

// Placeholder function to fetch posts for a specific user
export const getUserPosts = async (userId) => {
  // TODO: Replace with actual API call
  console.log(`Fetching posts for user with id ${userId}`);
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.author.id === userId);
};

// Placeholder function to fetch a single post by ID
export const getPostById = async (id) => {
  // TODO: Replace with actual API call
  console.log(`Fetching post with id ${id}`);
  const allPosts = await getAllPosts();
  return allPosts.find(post => post.id === parseInt(id));
};

// Placeholder function to create a new post
export const createPost = async (postData) => {
  // TODO: Replace with actual API call
  console.log('Creating new post', postData);
  return { id: Date.now(), ...postData };
};

// Placeholder function to update an existing post
export const updatePost = async (id, postData) => {
  // TODO: Replace with actual API call
  console.log(`Updating post with id ${id}`, postData);
  return { id, ...postData };
};

// Placeholder function to delete a post
export const deletePost = async (id) => {
  // TODO: Replace with actual API call
  console.log(`Deleting post with id ${id}`);
  return true;
};

// Export all functions
export {
  getAllPosts,
  getUserPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};