import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Navbar({ user, setUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // useEffect(() => {
  //   api.get("/api/users/checkLogin", {
  //         headers: {
  //           "Cache-Control": "no-store",
  //           Pragma: "no-cache",
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.loggedIn) setUser(res.data.user); // store user object
  //         else setUser(false); // logged out
  //       })
  //       .catch(() => setUser(false));
  // }, []);

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
      await api.get("/api/users/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
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

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-lg text-[#98430e] hover:text-[#98430e]">Home</Link>
          <Link to="/aboutus" className="text-lg text-[#98430e] hover:text-[#98430e]">About</Link>
          <Link to="/services" className="text-lg text-[#98430e] hover:text-[#98430e]">Services</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
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
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

        {/* ✅ Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-[#98430e] hover:text-orange-800 focus:outline-none"
        >
          <span
            className={`block h-[2px] w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-6 bg-current my-[4px] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-[2px] w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* ✅ Animated Mobile Menu with Blur */}
      <div
        className={`md:hidden backdrop-blur-lg bg-white/70 border-t border-gray-200 shadow-md overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-2 p-4 text-[#98430e] text-lg">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/aboutus" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>

          {user ? (
            <>
              <li>
                <Link to="/myevents" onClick={() => setMenuOpen(false)}>
                  My Events
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
