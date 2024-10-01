import React, { useState } from "react";
import {
  useDeleteBlogMutation,
  useFetchBlogsQuery,
} from "../../../redux/blogsFeatures/blogsApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../../utilis/formateDate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "../DashBorad/UserDashBorad";

function ManagePost() {
  const [query] = useState({ search: "", category: "" });
  const {
    data: blogsData = {},
    error,
    isLoading,
    refetch,
  } = useFetchBlogsQuery(query);
  const [deleteBlog] = useDeleteBlogMutation();
  const blogs = blogsData?.blogs || [];
  const { user } = useSelector((state) => state.auth);

  console.log("user datails : " , user);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        await deleteBlog(id).unwrap();
        refetch();
        toast.success("Blog deleted successfully!");
      } catch (error) {
        console.error("Failed to delete the blog:", error);
        toast.error("Failed to delete the blog.");
      }
    }
  };

  // Filter blogs based on user's role
  const filteredBlogs =
    user?.role === "admin"
      ? blogs
      : blogs.filter((blog) => blog.author === user._id);

  return (
    <>
      <ToastContainer />
      {user?.role === "user" ? (
        <div>
          <UserDashboard />
        </div>
      ) : (
        <div> no post</div>
      )}
      {isLoading && <p className="text-center py-4">Loading...</p>}
      {error && (
        <p className="text-center py-4 text-red-500">
          Error fetching blogs: {error.message}
        </p>
      )}

      {user?.role === "admin" ? (
        <section className="bg-blueGray-50">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-lg rounded-lg">
              <div className="rounded-t-lg px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-blueGray-700">
                    All Blogs
                  </h3>
                  <button className="bg-indigo-500 text-white text-xs font-bold uppercase px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    See all
                  </button>
                </div>
              </div>

              <div className="block w-full overflow-x-auto h-96">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blog Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Publishing Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Editor or Manage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBlogs.length > 0 ? (
                      filteredBlogs.map((blog, index) => (
                        <tr key={blog._id || index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="text-sm text-gray-500 break-words">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(blog.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                            <Link to={`/dashboard/update-items/${blog._id}`}>
                              <button className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded">
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-gray-500"
                        >
                          No blogs available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div> no post</div>
      )}
    </>
  );
}

export default ManagePost;
