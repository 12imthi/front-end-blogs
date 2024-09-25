import React from 'react';
import { useFetchUserBlogsQuery, useDeleteBlogMutation } from '../../../redux/blogsFeatures/blogsApi';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const { data, error, isLoading, refetch } = useFetchUserBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("Blog deleted successfully!");
        refetch(); // Refetch the blogs after deletion
      } catch (err) {
        toast.error("Failed to delete the blog.");
        console.error("Failed to delete the blog:", err);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user posts</p>;

  return (
    <div>
      <ToastContainer />
      <h1>Your Blog Posts</h1>
      {data?.posts?.length ? (
        data.posts.map((blog) => (
          <div key={blog._id} className="mb-4 p-4 border rounded-lg shadow-md">
            <BlogCard blog={blog} />
            <div className="flex justify-end mt-2 space-x-4">
              <Link to={`/edit-blog/${blog._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
