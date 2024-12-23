import React, { useState, useRef, useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaBowlFood } from "react-icons/fa6";
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt, FaImage, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isLoggedIn = true;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current && !userMenuRef.current.contains(event.target) &&
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ isUserMenuOpen, isMenuOpen]);

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">

        <Link to="/" className="flex items-center space-x-2">
          <FaBowlFood className="text-3xl text-orange-500" />
          <span className="text-xl font-semibold text-gray-800">restaurant</span>
        </Link>

        {/* Desktop and Tablet Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold text-lg"
                    : "text-gray-700 hover:text-orange-500 text-lg"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation Hamburger Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(true)}   
        >
          <HiOutlineMenuAlt3 onClick={() => setIsMenuOpen(true)} className="text-2xl" />
        </button>

    
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/viewcart"
            className="flex items-center space-x-2 bg-orange-500 text-white px-5 py-2 rounded-tl-lg rounded-br-lg shadow-md hover:bg-orange-600"
          >
            <BsCart4 className="text-2xl" />
            <span className="text-lg font-semibold">Cart</span>
          </Link>
          <Link
            to="/orders"
            className="hidden md:inline-block bg-orange-500 text-white px-5 py-2 rounded-tl-lg rounded-br-lg shadow-md hover:bg-orange-600"
          >
            <span className="text-lg font-semibold">Orders</span>
          </Link>

          {/* User Profile Button */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}  
              className="flex items-center space-x-2 bg-gray-500 text-white p-2 rounded-full"
            >
              <FaUserCircle className="text-2xl" />
            </button>

            {/* User Profile Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute text-lg top-10 right-0 bg-white shadow-md p-6 rounded-lg z-50">
                <Link
                  onClick={() => setIsUserMenuOpen(false)}
                  to={isLoggedIn ? "/profile" : "/login"}
                  className=" text-gray-700 hover:text-orange-500 flex items-center space-x-2 gap-2"
                >
                  <CgProfile />
                  Profile
                </Link>
                <Link
                  onClick={() => setIsUserMenuOpen(false)}
                  to={isLoggedIn ? "/login" : "/login"}
                  className=" text-gray-700 hover:text-orange-500 flex items-center space-x-2 gap-2"
                >
                  <FaSignInAlt />
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-3/4 bg-white transition-transform duration-300 z-50 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute border-b-2 top-4 right-10 text-gray-700"
          onClick={() => setIsMenuOpen(false)}  
        >
          <HiOutlineX className="text-2xl" />
        </button>

        <div className="px-6 mt-10 py-4 flex justify-center border-gray-200">
          <Link
            to="/viewcart"
            className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md mb-4"
            onClick={() => setIsMenuOpen(false)}   
          >
            <BsCart4 className="text-2xl" />
            <span className="text-lg">Cart</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-lg">Orders</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}  
              className="flex items-center space-x-2 text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-md w-full"
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-lg">{isLoggedIn ? "Profile" : "Login"}</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-md p-4 rounded-lg z-50">
                <Link
                  onClick={() => {
                    setIsUserMenuOpen(false)  
                    setIsMenuOpen(false)
                  
                  } }

                  to={isLoggedIn ? "/profile" : "/login"}
                  className="block text-yellow-700 hover:text-orange-500"
                >
                  Profile
                </Link>
                <Link
                  onClick={() => {
                    setIsUserMenuOpen(false)
                    setIsMenuOpen(false)
                  }}
                  to={isLoggedIn ? "/login" : "/login"}
                  className="block text-gray-700 hover:text-orange-500"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        <ul className="flex flex-col items-center mt-6 space-y-6 px-4">
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 text-orange-500 font-semibold text-lg py-2 px-4 rounded-md hover:bg-gray-100"
                  : "flex items-center space-x-2 text-gray-700 hover:text-orange-500 text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <FaBowlFood className="text-xl" />
              <span>Menu</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 text-orange-500 font-semibold text-lg py-2 px-4 rounded-md hover:bg-gray-100"
                  : "flex items-center space-x-2 text-gray-700 hover:text-orange-500 text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              }
              onClick={() => setIsMenuOpen(false)} 
            >
              <FaCalendarAlt className="text-xl" />
              <span>Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 text-orange-500 font-semibold text-lg py-2 px-4 rounded-md hover:bg-gray-100"
                  : "flex items-center space-x-2 text-gray-700 hover:text-orange-500 text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              }
              onClick={() => setIsMenuOpen(false)} 
            >
              <FaImage className="text-xl" />
              <span>Gallery</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 text-orange-500 font-semibold text-lg py-2 px-4 rounded-md hover:bg-gray-100"
                  : "flex items-center space-x-2 text-gray-700 hover:text-orange-500 text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              }
              onClick={() => setIsMenuOpen(false)} 
            >
              <FaInfoCircle className="text-xl" />
              <span>About</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-2 text-orange-500 font-semibold text-lg py-2 px-4 rounded-md hover:bg-gray-100"
                  : "flex items-center space-x-2 text-gray-700 hover:text-orange-500 text-lg py-2 px-4 rounded-md hover:bg-gray-100"
              }
              onClick={() => setIsMenuOpen(false)} 
            >
              <FaPhoneAlt className="text-xl" />
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
