import React from "react";
import { PulseLoader } from "react-spinners";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <PulseLoader
        color="#98430e"
        size={15}
        speedMultiplier={1}
      />
    </div>
  );
}

export default Loader;
