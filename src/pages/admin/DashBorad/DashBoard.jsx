import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FiUsers,
  FiFileText,
  FiUserCheck,
  FiMessageSquare,
} from "react-icons/fi";
import { useFetchBlogsQuery } from "../../../redux/blogsFeatures/blogsApi";
import { useGetCommentsQuery } from "../../../redux/commentsFeatures/commentApi";
import { useGetUserQuery } from "../../../redux/auth/authApi";
import BlogsChart from "./BlogsChart";

function StatCard({ title, icon: Icon, content, bgColor, iconBgColor }) {
  return (
    <div
      className={`${bgColor} py-2 w-full rounded-sm space-y-1 flex flex-col items-center`}
    >
      <div className={`${iconBgColor} p-2 rounded-full`}>
        <Icon className="text-white size-10" />
      </div>
      <p>
        {content} {title}
      </p>
    </div>
  );
}

function DashBoard() {
  // Correctly initializing state
  const [query, setQuery] = useState({ search: "", category: "" });
  const { user } = useSelector((state) => state.auth);
  const {
    data: blogsData,
    isLoading: blogsLoading,
    error: blogsError,
  } = useFetchBlogsQuery(query); // Fetching blogs
  const { data: commentsData = [] } = useGetCommentsQuery();
  const { data: usersData = {} } = useGetUserQuery();

  const blogs = blogsData?.blogs || [];
  const comments = commentsData || [];
  const users = usersData.users || [];

  // Calculate admin count
  const adminCount = users.filter((user) => user.role === "admin").length || 0;

  return (
    <>
      {blogsLoading && <p>Loading....</p>}
      {blogsError && <p>Error fetching blogs: {blogsError.message}</p>}
{ 
console.log(user)
}


    {
      user && user.role === 'admin' ? 
        <div className="space-y-6 mt-16">
        <div className="bg-bgPrimary p-5">
          <h1>Hi, {user?.username}</h1>
          <p>Welcome to the admin dashboard</p>
          <p>Here you can manage your posts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Users"
            icon={FiUsers}
            content={users.length}
            bgColor="bg-blue-100"
            iconBgColor="bg-blue-500"
          />
          <StatCard
            title="Blogs"
            icon={FiFileText}
            content={blogs.length}
            bgColor="bg-green-100"
            iconBgColor="bg-green-500"
          />
          <StatCard
            title="Admins"
            icon={FiUserCheck}
            content={adminCount}
            bgColor="bg-yellow-100"
            iconBgColor="bg-yellow-500"
          />
          <StatCard
            title="Comments"
            icon={FiMessageSquare}
            content={comments.totalComments || 0}
            bgColor="bg-red-100"
            iconBgColor="bg-red-500"
          />
        </div>

        {/* {chart} */}

        <div className="pt-5 pb-5">
          <BlogsChart blogs={blogs}  />
        </div>
      </div> : <div></div>
    }
    </>
  );
}

export default DashBoard;
