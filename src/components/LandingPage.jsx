import React from 'react';

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen bg-[#f6efe3] flex items-center p-10">
      {/* Left side - Big text content */}
      <div className="w-1/2 flex flex-col justify-center pl-20 pr-10">
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight">
          Feel
        </h1>
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight">
          Together
        </h1>
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight">
          Experiences
        </h1>
      </div>

      {/* Right side - Cards section */}
      <div className="relative w-1/2 h-full flex items-center justify-center">
        {/* Left card */}
        <div className="absolute w-60 h-80 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-2xl transform -rotate-5 -translate-x-28 z-10
                      hover:opacity-100 hover:-translate-x-32 hover:scale-110 hover:shadow-3xl hover:z-30
                      transition-all duration-400 ease-in-out cursor-pointer group"
            style={{ opacity: 1 }}>
          <div className="h-full flex items-center justify-center text-white font-bold text-2xl p-6">
            <span className="transform rotate-5 group-hover:rotate-0 transition-transform">Key Features</span>
          </div>
        </div>
        
        {/* Center card */}
        <div className="relative w-72 h-96 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-3xl z-20 flex items-center justify-center border border-gray-300
                      hover:scale-105 hover:shadow-4xl transition-all duration-300">
          <span className="text-4xl font-bold text-gray-900">Preview</span>
        </div>
        
        {/* Right card */}
        <div className="absolute w-60 h-80 bg-gradient-to-br from-green-600 to-green-500 rounded-xl shadow-2xl transform rotate-5 translate-x-28 z-10
                      hover:opacity-100 hover:translate-x-32 hover:scale-110 hover:shadow-3xl hover:z-30
                      transition-all duration-400 ease-in-out cursor-pointer group"
            style={{ opacity: 1 }}>
          <div className="h-full flex items-center justify-center text-white font-bold text-2xl p-6">
            <span className="transform -rotate-5 group-hover:rotate-0 transition-transform">Benefits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;