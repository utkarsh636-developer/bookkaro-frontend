import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-[#f6efe3] flex flex-col lg:flex-row items-center pt-36 p-6 lg:p-10 overflow-x-hidden">
      {/* Left side - Text content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center pl-0 2xl:pl-20 lg:pr-10 lg:mb-0">
        <h1 className="text-[42px] sm:text-6xl md:text-7xl xl:text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Feel
        </h1>
        <h1 className="text-[42px] sm:text-6xl md:text-7xl xl:text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Together
        </h1>
        <h1 className="text-[42px] sm:text-6xl md:text-7xl xl:text-8xl font-bold text-gray-800 font-bungee leading-tight" style={{textShadow: "4px 4px 0 rgba(0,0,0,0.2), 8px 8px 0 rgba(0,0,0,0.1)"}}>
          Experiences
        </h1>
      </div>

      {/* Right side - Cards */}
      <div className="relative w-full lg:w-1/2 h-[32rem] flex items-center justify-center lg:pl-20">

        {/* Left Card */}
        <motion.div
          initial={{ x: -140, rotate: -5 }}
          whileHover={{
            x: -220,   // moves further LEFT, away from center
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 18,
          }}
          onClick={() =>
            navigate("/detailsPage/6939a8fe38363e2819509a83")
          }
          className="absolute z-10 w-48 xl:w-60 h-64 xl:h-80 rounded-xl shadow-2xl overflow-hidden cursor-pointer"
        >
          <img
            src="/images/holi.jpg"
            alt="Holi Festival"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Center Card (always on top) */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.25 }}
          onClick={() =>
            navigate("/detailsPage/6937217383eabe13f13cf33c")
          }
          className="relative z-20 w-56 xl:w-72 h-72 xl:h-96 rounded-2xl shadow-3xl overflow-hidden"
        >
          <img
            src="/images/arijitSingh.jpg"
            alt="Concert"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ x: 140, rotate: 5 }}
          whileHover={{
            x: 220,   // moves further RIGHT, away from center
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 18,
          }}
          onClick={() =>
            navigate("/detailsPage/6939a9c338363e2819509ab4")
          }
          className="absolute z-10 w-48 xl:w-60 h-64 xl:h-80 rounded-xl shadow-2xl overflow-hidden cursor-pointer"
        >
          <img
            src="/images/dj_night.jpg"
            alt="DJ Night"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
      </div>

    </div>
  );
};

export default LandingPage;