import React from 'react'
import api from "../api";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        if (window.scrollY > lastScrollY) {
          setHidden(true);
        } else {
          setHidden(false);
        }

        lastScrollY = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      api.get("/users/checkLogin")
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
          }
        })
        .catch(() => setUser(null));
    }, []);

    const handleLogout = () => {
      api.get("/users/logout").then(() => setUser(null));
    };

    return (
      <div>
        <nav 
          className={`w-full z-50 fixed top-0 left-0 transition-all duration-500 ${
            hidden ? "-translate-y-full" : "translate-y-0"
          } ${scrolled ? "backdrop-blur-md bg-white/60 shadow-md" : "bg-transparent"}`}
        >
          <div className="max-w-[1400px] flex flex-wrap items-center justify-between mx-auto p-4">

            <a href="/" className="flex items-center space-x-3">
              <img src="/images/main_logo.png" className="h-16 w-16 rounded-xl" alt="Logo" />
              <span className="text-3xl font-bold text-[#98430e]">bookkaro</span>
            </a>

            <div className="flex md:hidden">
              <button 
                data-collapse-toggle="navbar-search" 
                type="button"
                className="text-[#98430e] p-2 rounded-lg hover:bg-[#e4d3c5] focus:outline-none focus:ring-2 focus:ring-[#98430e]"
                aria-controls="navbar-search" 
                aria-expanded="false"
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
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>

            <div 
              className="items-center justify-between hidden w-full md:flex md:w-auto" 
              id="navbar-search"
            >
              <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 w-full md:w-auto bg-[#f6efe3] md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
                <li>
                  <a href="/" className="block py-2 px-4 text-lg text-[#98430e] hover:bg-[#e4d3c5] rounded md:hover:bg-transparent md:hover:text-[#98430e] transition">Home</a>
                </li>
                <li>
                  <a href="/aboutus" className="block py-2 px-4 text-lg text-[#98430e] hover:bg-[#e4d3c5] rounded md:hover:bg-transparent md:hover:text-[#98430e] transition">About</a>
                </li>
                <li>
                  <a href="/services" className="block py-2 px-4 text-lg text-[#98430e] hover:bg-[#e4d3c5] rounded md:hover:bg-transparent md:hover:text-[#98430e] transition">Services</a>
                </li>
                <li>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      href="/login"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Login
                    </a>
                  )}
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    )
}

export default Navbar
