// // TagManagement.jsx
// import React, { useState, useEffect } from 'react';

// const TagManagement = () => {
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState('');
//   const [editingTag, setEditingTag] = useState(null);

//   // In a real application, you'd fetch tags from an API
//   useEffect(() => {
//     // Simulating API call
//     setTags([
//       { id: 1, name: 'React' },
//       { id: 2, name: 'JavaScript' },
//       { id: 3, name: 'Web Development' }
//     ]);
//   }, []);

//   const handleAddTag = () => {
//     if (newTag.trim()) {
//       const newTagObject = { id: Date.now(), name: newTag.trim() };
//       setTags([...tags, newTagObject]);
//       setNewTag('');
//     }
//   };

//   const handleEditTag = (tag) => {
//     setEditingTag(tag);
//   };

//   const handleUpdateTag = () => {
//     if (editingTag.name.trim()) {
//       setTags(tags.map(tag => tag.id === editingTag.id ? editingTag : tag));
//       setEditingTag(null);
//     }
//   };

//   const handleDeleteTag = (tagId) => {
//     setTags(tags.filter(tag => tag.id !== tagId));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Tag Management</h2>
      
//       {/* Add new tag */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           className="border p-2 mr-2"
//           placeholder="New tag name"
//         />
//         <button onClick={handleAddTag} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Add Tag
//         </button>
//       </div>

//       {/* List of tags */}
//       <ul className="space-y-2">
//         {tags.map(tag => (
//           <li key={tag.id} className="flex items-center">
//             {editingTag && editingTag.id === tag.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editingTag.name}
//                   onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
//                   className="border p-2 mr-2"
//                 />
//                 <button onClick={handleUpdateTag} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
//                   Update
//                 </button>
//               </>
//             ) : (
//               <>
//                 <span className="mr-2">{tag.name}</span>
//                 <button onClick={() => handleEditTag(tag)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
//                   Edit
//                 </button>
//               </>
//             )}
//             <button onClick={() => handleDeleteTag(tag.id)} className="bg-red-500 text-white px-4 py-2 rounded">
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TagManagement;
// components/Dashboard/TagManagement.jsx
import React, { useState, useEffect } from 'react';

const TagManagement = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    // Simulating API call
    setTags([
      { id: 1, name: 'React' },
      { id: 2, name: 'JavaScript' },
      { id: 3, name: 'Web Development' }
    ]);
  }, []);

  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObject = { id: Date.now(), name: newTag.trim() };
      setTags([...tags, newTagObject]);
      setNewTag('');
    }
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag);
  };

  const handleUpdateTag = () => {
    if (editingTag.name.trim()) {
      setTags(tags.map(tag => tag.id === editingTag.id ? editingTag : tag));
      setEditingTag(null);
    }
  };

  const handleDeleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tag Management</h2>
      
      {/* Add new tag */}
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="border p-2 mr-2 flex-grow"
          placeholder="New tag name"
        />
        <button onClick={handleAddTag} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Tag
        </button>
      </div>

      {/* List of tags */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Tag Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tags.map(tag => (
              <tr key={tag.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {editingTag && editingTag.id === tag.id ? (
                    <input
                      type="text"
                      value={editingTag.name}
                      onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
                      className="border p-2 w-full"
                    />
                  ) : (
                    tag.name
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {editingTag && editingTag.id === tag.id ? (
                    <button onClick={handleUpdateTag} className="text-green-500 hover:underline mr-2">
                      Update
                    </button>
                  ) : (
                    <button onClick={() => handleEditTag(tag)} className="text-blue-500 hover:underline mr-2">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteTag(tag.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TagManagement;