// BlogPostFull.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostFull = ({ post, relatedPosts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        {/* Featured Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author Info and Publication Date */}
        <div className="flex items-center mb-6">
          {post.author.avatar && (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-4"
            />
          )}
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-gray-600 text-sm">{post.date}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Post Content */}
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {relatedPost.image && (
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                    <Link
                      to={`/blog/${relatedPost.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostFull;