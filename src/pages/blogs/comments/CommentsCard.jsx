import React from "react";
import { useSelector } from "react-redux";
import formatDate from '../../../utilis/formateDate';
import PostAComments from "./PostAComments";
import { FaRegComment } from "react-icons/fa";


function CommentsCard({ comments }) {
  
  console.log('commets' , comments);

  const user = useSelector((state)=> state.auth.user)

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mt-5">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <div className="flex flex-col space-y-4">
        {comments.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments</h3>
            {comments.map((comment, index) => (
              <div key={index}>
                <div>
                  {/* <img  alt={} className="h-14" /> */}
                  <p><FaRegComment /></p>
                  <div>
                    <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-700">{comment?.user?.username}</p>
                    <p className="text-[12px] italic">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                {/* {comments-details} */}

                <div className="text-gray-500 mt-5 border p-8">
                    <p className="md:w-4/5">{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-left">No comments yet.</p>
        )}
      </div>

      {/* {comments input here} */}

      <PostAComments/>
    </div>
  );
}

export default CommentsCard;
