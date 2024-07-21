// // BlogPostEditor.jsx
// import React, { useState, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const BlogPostEditor = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [featuredImage, setFeaturedImage] = useState('');
//   const [preview, setPreview] = useState(false);
//   const [availableTags, setAvailableTags] = useState([]);

//   // In a real application, you'd fetch tags from an API
//   useEffect(() => {
//     // Simulating API call
//     setAvailableTags([
//       { id: 1, name: 'React' },
//       { id: 2, name: 'JavaScript' },
//       { id: 3, name: 'Web Development' }
//     ]);
//   }, []);

//   const handleSaveDraft = () => {
//     // Implement save draft functionality
//     console.log('Saving draft...', { title, content, selectedTags, featuredImage });
//   };

//   const handlePublish = () => {
//     // Implement publish functionality
//     console.log('Publishing post...', { title, content, selectedTags, featuredImage });
//   };

//   const handleTagToggle = (tagId) => {
//     setSelectedTags(prevSelectedTags =>
//       prevSelectedTags.includes(tagId)
//         ? prevSelectedTags.filter(id => id !== tagId)
//         : [...prevSelectedTags, tagId]
//     );
//   };

//   const renderPreview = () => (
//     <div className="preview">
//       <h1>{title}</h1>
//       <img src={featuredImage} alt="Featured" />
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//       <p>Tags: {selectedTags.map(tagId => 
//         availableTags.find(tag => tag.id === tagId)?.name
//       ).join(', ')}</p>
//     </div>
//   );

//   const renderEditor = () => (
//     <div className="editor">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Blog Title"
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <ReactQuill value={content} onChange={setContent} className="mb-4" />
//       <div className="mb-4">
//         <p className="mb-2">Tags:</p>
//         {availableTags.map(tag => (
//           <button
//             key={tag.id}
//             onClick={() => handleTagToggle(tag.id)}
//             className={`mr-2 mb-2 px-2 py-1 rounded ${
//               selectedTags.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {tag.name}
//           </button>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={featuredImage}
//         onChange={(e) => setFeaturedImage(e.target.value)}
//         placeholder="Featured Image URL"
//         className="w-full p-2 mb-4 border rounded"
//       />
//       <div className="flex justify-between">
//         <button onClick={handleSaveDraft} className="bg-gray-500 text-white px-4 py-2 rounded">
//           Save Draft
//         </button>
//         <button onClick={handlePublish} className="bg-green-500 text-white px-4 py-2 rounded">
//           Publish
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <button
//         onClick={() => setPreview(!preview)}
//         className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {preview ? 'Edit' : 'Preview'}
//       </button>
//       {preview ? renderPreview() : renderEditor()}
//     </div>
//   );
// };

// export default BlogPostEditor;

// components/BlogPostEditor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getPostById, createPost, updatePost } from '../services/blogService';

const BlogPostEditor = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
    fetchTags();
  }, [id]);

  const fetchPost = async () => {
    try {
      const post = await getPostById(id);
      setTitle(post.title);
      setContent(post.content);
      setSelectedTags(post.tags);
      setFeaturedImage(post.image);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchTags = async () => {
    // Simulating API call for tags
    setAvailableTags([
      { id: 1, name: 'React' },
      { id: 2, name: 'JavaScript' },
      { id: 3, name: 'Web Development' }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      tags: selectedTags,
      image: featuredImage,
      authorId: user.id
    };

    try {
      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      navigate(user.role === 'admin' ? '/admin/posts' : '/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter(id => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-2 border rounded"
          required
        />
        <ReactQuill value={content} onChange={setContent} className="h-64 mb-4" />
        <div>
          <p className="mb-2">Tags:</p>
          {availableTags.map(tag => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagToggle(tag.id)}
              className={`mr-2 mb-2 px-2 py-1 rounded ${
                selectedTags.includes(tag.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          placeholder="Featured Image URL"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {id ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogPostEditor;