import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { useLogoutUserMutation } from "../redux/auth/authApi";
import { logout } from "../redux/auth/authSlice";

const navList = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="bg-white py-3 border">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="/medium-logo.png" alt="logo" className="h-12" />
        </a>

        <ul className="lg-custom:flex hidden items-center gap-8">
          {navList.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.path}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {/* {user && user.role === "user" ? (
            <li className="flex items-center p-1 bg-green-50 rounded-md shadow-sm">
              <FaRegUserCircle className="text-2xl text-green-700" />
              <span className="ml-2 text-md font-medium text-gray-700">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 px-2 py-1 bg-red-600 text-white rounded-md text-sm transition duration-150 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )} */}

          {user  && (
            <li className="flex items-center p-1 bg-blue-50 rounded-md shadow-sm">
              <FaRegUserCircle className="text-2xl text-blue-700" />
              <span className="ml-2 text-md font-medium text-gray-700">
                {user.username}
              </span>
              <Link to="/dashboard" className="ml-3">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md transition duration-150 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Dashboard
                </button>
              </Link>
            </li>
          )}
        </ul>

        <div className="lg-custom:hidden flex items-center gap-4">
          {/* Dashboard button for smaller screens */}
          {user && user.role === "admin" && (
            <Link to="/dashboard">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md transition duration-150 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Dashboard
              </button>
            </Link>
          )}

          <button
            onClick={toggleMenu}
            className="flex items-center px-1 py-1 bg-gray-50 rounded text-sm text-gray-500"
          >
            {isMenuOpen ? (
              <IoIosCloseCircleOutline className="size-6" />
            ) : (
              <CiMenuBurger className="size-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <ul className="fixed top-[80px] left-0 w-full h-auto bg-white pb-8 border-b shadow-sm">
            {navList.map((list, index) => (
              <li key={index} className="mt-4 px-4 text-left">
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  to={list.path}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {list.name}
                </NavLink>
              </li>
            ))}

            {user && user.role === "admin" ? (
              <li className="flex items-center">
                <div className="flex items-center p-2 bg-blue-100 rounded-full">
                  <FaUser className="text-xl text-blue-700" />
                </div>
                <span className="ml-2">{user.username}</span>
              </li>
            ) : (
              <li className="text-left mt-4 px-4">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
