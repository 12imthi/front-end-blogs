import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../../redux/blogsFeatures/blogsApi";

// Utility function to truncate text
function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

function RelatedBlogs() {
  const { id } = useParams();

  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  console.log("relatedBlogs : ", blogs);

  return (
    <div className="px-4 md:px-8 mb-6">
      <h3 className="text-xl font-medium pt-8 pb-6">Related Blogs</h3>
      <hr />
      {blogs.length > 0 ? (
        <div className="space-y-4 mt-5">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${blog._id}`}
              className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={blog.coverImg}
                alt={blog.title}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm md:text-base font-medium text-blue-700">{blog.title}</h4>
                <p className="text-xs md:text-sm text-gray-500">
                  {truncateText(blog.description, 5)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8">No related blogs found!</div>
      )}
    </div>
  );
}

export default RelatedBlogs;
