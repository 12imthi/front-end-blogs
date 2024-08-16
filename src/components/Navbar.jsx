import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

const navList = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white py-3 border">
      <nav className="container mx-auto flex justify-between px-5">
        <a href="/">
          <img src="/src/assets/medium-logo.png" alt="logo" className="h-12" />
        </a>
        <ul className="sm:flex hidden items-center gap-8">
          {navList.map((list, index) => (
            <li key={index}>
              <NavLink
                to={`${list.path}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {" "}
                {list.name}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="flex  items-center px-3 py-4 bg-gray-50 rounded  text-sm
          text-gray-500 hover:text
          
          -gray-500"
          >
            {isMenuOpen ? (
              <IoIosCloseCircleOutline className="size-6" />
            ) : (
              <CiMenuBurger className="size-6" />
            )}
            {/*mobile menu item */}
            {
              isMenuOpen &&   <ul className="fixed top-[80px] left-0 w-full h-auto bg-white pb-8 border-b shadow-sm-50">
              {navList.map((list, index) => (
                <li key={index} className='mt-4 px-4  text-left' >
                  <NavLink
                  onClick={() => setIsMenuOpen(false)}
                    to={`${list.path}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {" "}
                    {list.name}
                  </NavLink>
                </li>
              ))}
              <li className="text-left mt-4 px-4">
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
            }
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
