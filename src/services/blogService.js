// // src/services/blogService.js

// // Placeholder for API base URL
// const API_BASE_URL = '/api';

// // Placeholder function to fetch all posts
// const getAllPosts = async () => {
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

// // Placeholder function to fetch posts for a specific user
// const getUserPosts = async (userId) => {
//   // TODO: Replace with actual API call
//   console.log(`Fetching posts for user with id ${userId}`);
//   const allPosts = await getAllPosts();
//   return allPosts.filter(post => post.author.id === userId);
// };

// // Placeholder function to fetch a single post by ID
// const getPostById = async (id) => {
//   // TODO: Replace with actual API call
//   console.log(`Fetching post with id ${id}`);
//   const allPosts = await getAllPosts();
//   return allPosts.find(post => post.id === parseInt(id));
// };

// // Placeholder function to create a new post
// const createPost = async (postData) => {
//   // TODO: Replace with actual API call
//   console.log('Creating new post', postData);
//   return { id: Date.now(), ...postData };
// };

// // Placeholder function to update an existing post
// const updatePost = async (id, postData) => {
//   // TODO: Replace with actual API call
//   console.log(`Updating post with id ${id}`, postData);
//   return { id, ...postData };
// };

// // Placeholder function to delete a post
// const deletePost = async (id) => {
//   // TODO: Replace with actual API call
//   console.log(`Deleting post with id ${id}`);
//   return true;
// };

// // Export all functions
// export {
//   getAllPosts,
//   getUserPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost
// };
// src/services/blogService.js

import posts from '../data/posts.json';
import users from '../data/users.json';

// Simulating network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch all posts
const getAllPosts = async () => {
  await delay(500); // Simulate network delay
  console.log('Fetching all posts');
  return posts.map(post => ({
    ...post,
    author: users.find(user => user.id === post.author)
  }));
};

// Function to fetch posts for a specific user
const getUserPosts = async (userId) => {
  await delay(300);
  console.log(`Fetching posts for user with id ${userId}`);
  return posts
    .filter(post => post.author === userId)
    .map(post => ({
      ...post,
      author: users.find(user => user.id === post.author)
    }));
};

// Function to fetch a single post by ID
const getPostById = async (id) => {
  await delay(200);
  console.log(`Fetching post with id ${id}`);
  const post = posts.find(post => post.id === parseInt(id));
  if (post) {
    return {
      ...post,
      author: users.find(user => user.id === post.author)
    };
  }
  return null;
};

// Function to create a new post
const createPost = async (postData) => {
  await delay(700);
  console.log('Creating new post', postData);
  const newPost = { id: posts.length + 1, ...postData, date: new Date().toISOString() };
  posts.push(newPost);
  return newPost;
};

// Function to update an existing post
const updatePost = async (id, postData) => {
  await delay(500);
  console.log(`Updating post with id ${id}`, postData);
  const index = posts.findIndex(post => post.id === parseInt(id));
  if (index !== -1) {
    posts[index] = { ...posts[index], ...postData };
    return posts[index];
  }
  throw new Error('Post not found');
};

// Function to delete a post
const deletePost = async (id) => {
  await delay(500);
  console.log(`Deleting post with id ${id}`);
  const index = posts.findIndex(post => post.id === parseInt(id));
  if (index !== -1) {
    posts.splice(index, 1);
    return true;
  }
  throw new Error('Post not found');
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