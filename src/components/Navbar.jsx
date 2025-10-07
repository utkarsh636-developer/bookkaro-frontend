import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState(() => !!localStorage.getItem("token"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setHidden(window.scrollY > lastScrollY);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    api.get("/api/users/checkLogin")
      .then((res) => setUser(res.data.loggedIn))
      .catch(() => setUser(false));
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/api/users/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 
      ${hidden ? "-translate-y-full" : "translate-y-0"} 
      ${scrolled ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-[1400px] flex items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/main_logo.png" className="h-16 w-16 rounded-xl" alt="Logo" />
          <span className="text-3xl font-bold text-[#98430e]">bookkaro</span>
        </Link>

        {/* Menu items */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-lg text-[#98430e] hover:text-[#98430e]">Home</Link>
          <Link to="/aboutus" className="text-lg text-[#98430e] hover:text-[#98430e]">About</Link>
          <Link to="/services" className="text-lg text-[#98430e] hover:text-[#98430e]">Services</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile icon */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#98430e] text-white hover:bg-orange-800 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" />
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/myevents"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Events
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#98430e] text-white px-4 py-2 rounded-md hover:bg-orange-800 transition cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
