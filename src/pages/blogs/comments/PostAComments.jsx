import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PostAComments() {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission logic here
    console.log('Comment submitted:', comment);
    setComment(''); // Clear the comment field after submission
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto mt-4">
      <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="6"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your opinion about this post..."
          className="w-full bg-gray-100 focus:outline-none border border-gray-300 p-4 rounded-md resize-none mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostAComments;
