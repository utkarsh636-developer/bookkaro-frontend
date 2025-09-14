import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../api";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState(null);

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
    api.get("/users/checkLogin")
      .then((res) => {
        if (res.data.loggedIn) setUser(res.data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await api.get("/users/logout");
      setUser(null);
      window.location.href = "/";
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

        {/* Mobile toggle */}
        <div className="flex md:hidden">
          <button 
            data-collapse-toggle="navbar-search" 
            type="button"
            className="text-[#98430e] p-2 rounded-lg hover:bg-[#e4d3c5] focus:outline-none focus:ring-2 focus:ring-[#98430e]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>

        {/* Menu items */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link to="/" className="text-lg text-[#98430e] hover:text-[#98430e]">Home</Link>
          <Link to="/aboutus" className="text-lg text-[#98430e] hover:text-[#98430e]">About</Link>
          <Link to="/services" className="text-lg text-[#98430e] hover:text-[#98430e]">Services</Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
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
