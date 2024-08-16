import React, { useState } from "react";
import { useFetchBlogsQuery } from "../../redux/blogsFeatures/blogsApi";
import SearchBlog from "./SearchBlog";
import { Link } from "react-router-dom";

function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  // get data using redux

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  console.log("blogs Data : ", blogs);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e) => setQuery({ search, category });

  return (
    <div className="mt-16 container mx-auto">
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {isLoading && <div>Loading....</div>}
      {error && <div>{error.toString()}</div>}
      <div className="mt-8 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blogs/${blog._id}`} className="shadow-md">
            <img src={blog.coverImg} alt="" className="h-80 w-full" />
            <h2 className="text-xl p-4">{blog.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
