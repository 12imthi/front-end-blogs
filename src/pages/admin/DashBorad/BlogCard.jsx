import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, author, createdAt, coverImg } = blog;

  return (
    <div className="blog-card bg-white shadow-md rounded-lg overflow-hidden">
      {coverImg && (
        <img
          src={coverImg}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">
          <Link to={`/blogs/${blog._id}`} className="hover:underline">
            {title}
          </Link>
        </h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-sm text-gray-500">
          <p>By: {author?.name || 'Unknown'}</p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
