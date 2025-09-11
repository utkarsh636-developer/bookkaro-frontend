import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className="w-full z-50 mt-5 fixed">
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
                <a href="/users/logout" className="block py-2 px-4 border border-red-600 rounded text-red-600 hover:bg-red-600 hover:text-white transition">Logout</a>
              </li>
              <li>
                <a href="/login" className="block py-2 px-4 border border-[#98430e] text-[#98430e] rounded hover:bg-[#98430e] hover:text-[#f6efe3] transition">Login</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
