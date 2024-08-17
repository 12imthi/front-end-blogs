import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/commentsFeatures/commentApi";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useFetchBlogByIdQuery } from "../../../redux/blogsFeatures/blogsApi";

function PostAComments() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // console.log( 'comments' ,user);

  const [postComment] = usePostCommentMutation();
const{refetch} = useFetchBlogByIdQuery(id,{skip: !id})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to comment.");
      navigate("/login");
      return;
    }

    const newComment = {
      comment: comment,
      user: user?._id,
      postId: id,
    };
    console.log("Comment submitted:", newComment);

    try {
      const response = await postComment(newComment).unwrap();
      console.log("new comments :", response);

      toast.success("Comment submitted successfully!");
      setComment(""); 
      refetch()
    } catch (error) {
      toast.error("Failed to submit comment."); 
      console.error("Error submitting comment:", error);
    }
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
