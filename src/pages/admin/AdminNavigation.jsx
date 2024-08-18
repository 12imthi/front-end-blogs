import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function AdminNavigation() {
  return (
    <div className="bg-white space-y-5 p-8 h-[calc(100vh-98px)] flex flex-col justify-between mt-5 mb-5 rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <FaRegUserCircle className="text-3xl text-blue-700 mb-2" />
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <hr className="border-gray-200 mt-3" />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold whitespace-nowrap"
                  : "text-black hover:text-blue-600 whitespace-nowrap"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-new-post"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold whitespace-nowrap"
                  : "text-black hover:text-blue-600 whitespace-nowrap"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-items"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold whitespace-nowrap"
                  : "text-black hover:text-blue-600 whitespace-nowrap"
              }
            >
              Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold whitespace-nowrap"
                  : "text-black hover:text-blue-600 whitespace-nowrap"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <hr />
        <button className="text-white bg-red-600 font-medium px-5 py-2 rounded hover:bg-red-700 transition duration-300 w-full">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavigation;
