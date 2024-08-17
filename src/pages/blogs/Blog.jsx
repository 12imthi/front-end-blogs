import React, { useState, useEffect } from "react";
import { useFetchBlogsQuery } from "../../redux/blogsFeatures/blogsApi";
import SearchBlog from "./SearchBlog";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function Blog() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });
  const [noResultsToastShown, setNoResultsToastShown] = useState(false); // State to track if the no results toast has been shown

  // Get data using redux
  const { data, error, isLoading } = useFetchBlogsQuery(query);

  // Safely access the blogs array from the data object
  const blogs = data?.blogs || [];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!search) {
      toast.info("Please enter a search term."); // Informative toast for empty search
      return;
    }

    setQuery({ search });
    

  };

  // Effect to handle errors
  useEffect(() => {
    if (error) {
      toast.error("Error fetching blogs: " + error.message); // Error toast
    }
  }, [error]);

  // Check for empty blogs array
  useEffect(() => {
    if (search && blogs.length === 0 && !isLoading && !noResultsToastShown) {
      toast.info("No blogs found for: " + search); // Toast when no blogs are found for the search term
      setNoResultsToastShown(true); // Mark that the toast has been shown
    }
  }, [blogs, search, isLoading, noResultsToastShown]);

  return (
    <div className="mt-16  container  p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>

      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {isLoading && <div className="text-center mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500">{error.toString()}</div>}

      <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.length === 0 && !isLoading && (
          <div className="text-center col-span-full text-gray-500">
            No blogs found.
          </div>
        )}
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blogs/${blog._id}`} className="shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="h-60 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(blog.createdAt).toLocaleDateString()} 
              </p>
              <p className="text-gray-700">
                {blog.excerpt || 'Read more to learn about this post...'}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Toast Container for showing notifications */}
      <ToastContainer />
    </div>
  );
}

export default Blog;
