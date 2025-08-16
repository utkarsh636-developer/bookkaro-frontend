import React from 'react';

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen bg-[#f6efe3] flex items-center p-10">
      {/* Left side - Big text content */}
      <div className="w-1/2 flex flex-col justify-center pl-20 pr-10">
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Feel
        </h1>
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Together
        </h1>
        <h1 className="text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Experiences
        </h1>
      </div>

      {/* Right side - Cards section */}
      <div className="relative w-1/2 h-full flex items-center justify-center">
        {/* Left card */}
        <div className="absolute w-60 h-80 rounded-xl shadow-2xl transform -rotate-5 -translate-x-28 z-10
                      hover:-translate-x-32 hover:scale-110 hover:shadow-3xl hover:z-30
                      transition-all duration-400 ease-in-out cursor-pointer overflow-hidden">
          <img 
            src="/images/holi.jpg" 
            alt="Marathon event"
            className="w-full h-full object-cover scale-125"
          />
        </div>
        
        {/* Center card */}
        <div className="relative w-72 h-96 rounded-2xl shadow-3xl z-20 overflow-hidden
                      hover:scale-105 hover:shadow-4xl transition-all duration-300">
          <img 
            src="/images/arijitSingh.jpg" 
            alt="Concert event"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right card */}
        <div className="absolute w-60 h-80 rounded-xl shadow-2xl transform rotate-5 translate-x-28 z-10
                      hover:translate-x-32 hover:scale-110 hover:shadow-3xl hover:z-30
                      transition-all duration-400 ease-in-out cursor-pointer overflow-hidden">
          <img 
            src="/images/dj_night.jpg" 
            alt="Holi festival"
            className="w-full h-full object-cover scale-125"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;