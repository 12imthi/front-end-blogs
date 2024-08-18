import React, { useState, useEffect } from "react";
import { useFetchBlogsQuery } from "../../redux/blogsFeatures/blogsApi";
import SearchBlog from "./SearchBlog";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Blog() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });
  const [noResultsToastShown, setNoResultsToastShown] = useState(false);

  const { data, error, isLoading } = useFetchBlogsQuery(query);

  const blogs = data?.blogs || [];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!search) {
      toast.info("Please enter a search term.");
      return;
    }
    setQuery({ search });
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching blogs: " + error.message);
    }
  }, [error]);

  useEffect(() => {
    if (search && blogs.length === 0 && !isLoading && !noResultsToastShown) {
      toast.info("No blogs found for: " + search);
      setNoResultsToastShown(true);
    }
  }, [blogs, search, isLoading, noResultsToastShown]);

  return (
    <div className="mt-16 container p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>

      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {isLoading && <div className="text-center mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500">{error.toString()}</div>}

      <div className="mt-8 flex flex-col gap-8">
        {blogs.length === 0 && !isLoading && (
          <div className="text-center text-gray-500">No blogs found.</div>
        )}
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                {blog.excerpt || 'Read more to learn about this post...'}
              </p>
            </div>
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="h-32 w-48 object-cover rounded-lg"
            />
          </Link>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Blog;
