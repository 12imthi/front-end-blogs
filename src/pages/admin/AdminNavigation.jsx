import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useLogoutUserMutation } from "../../redux/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AdminNavigation() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout successful!");
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white space-y-5 p-8 h-[calc(100vh-98px)] flex flex-col justify-between mt-5 mb-5 rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <FaRegUserCircle className="text-3xl text-blue-700" />
          <h1 className="text-gray-600 font-bold">
            {user?.role === 'admin' ? 'Admin' : 'User'}
          </h1>
        </div>
        <hr className="border-gray-200 mt-3" />
        <ul className="space-y-5 pt-5">
         { user?.role === 'admin' &&
          ( <li>
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
          </li>)
         }
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
          {/* Show "Users" link only for admins */}
          {user?.role === 'admin' && (
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
          )}
        </ul>
      </div>

      <div className="mb-3">
        <hr />
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 font-medium px-5 py-2 rounded hover:bg-red-700 transition duration-300 w-full"
        >
          Logout
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default AdminNavigation;
