import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-24 md:mt-32 py-10 px-4 sm:px-3 md:px-4 lg:px-10 xl:px-20 2xl:px-40">

      {/* Hero */}
      <div className="mb-14">
        <h1 className="font-bungee text-3xl sm:text-4xl md:text-5xl text-[#98430e] mb-6">
          About BookKaro
        </h1>

        <p className="font-righteous text-lg sm:text-xl leading-relaxed text-gray-700 max-w-4xl">
          Discover. Book. Experience.
        </p>
      </div>

      {/* Intro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div
          className="
            bg-white rounded-2xl p-7
            border border-gray-200
            hover:border-[#98430e]/60
            hover:shadow-[0_0_0_2px_rgba(152,67,14,0.25)]
            transition-all duration-300
          "
        >
          <h2 className="font-righteous text-xl text-[#98430e] mb-4">
            What We Do
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            BookKaro is an all-India event discovery and ticket booking platform.
            From concerts and comedy shows to workshops, college fests,
            cultural events, and conferences — we bring experiences closer to you.
          </p>
        </div>

        <div
          className="
            bg-white rounded-2xl p-7
            border border-gray-200
            hover:border-[#98430e]/60
            hover:shadow-[0_0_0_2px_rgba(152,67,14,0.25)]
            transition-all duration-300
          "
        >
          <h2 className="font-righteous text-xl text-[#98430e] mb-4">
            Why We Exist
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            Finding great events shouldn’t be complicated.
            We created BookKaro to simplify ticketing, reduce confusion,
            and make events accessible to everyone — anywhere in India.
          </p>
        </div>
      </div>

      {/* Mission Strip */}
      <div className="bg-[#98430e] rounded-3xl p-8 sm:p-10 text-white mb-20">
        <h2 className="font-bungee text-2xl sm:text-3xl mb-4">
          Our Mission
        </h2>
        <p className="font-righteous text-base sm:text-lg leading-relaxed">
          To connect people with unforgettable experiences while empowering
          event organizers with a transparent, reliable, and modern platform.
        </p>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="font-bungee text-2xl sm:text-3xl text-[#98430e] mb-10">
          Why Choose BookKaro?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature emoji="🎟️" title="Simple Booking" text="Fast & easy ticket booking with a smooth checkout." />
          <Feature emoji="🇮🇳" title="Pan-India Events" text="Discover events across multiple cities in India." />
          <Feature emoji="💳" title="Clear Pricing" text="Transparent ticket prices — no hidden surprises." />
          <Feature emoji="⚡" title="Built for Speed" text="Optimized experience across all devices." />
        </div>
      </div>

      {/* Closing */}
      <div
        className="
          bg-white rounded-2xl p-8
          border border-gray-200
          hover:border-[#98430e]/60
          hover:shadow-[0_0_0_2px_rgba(152,67,14,0.25)]
          transition-all duration-300
        "
      >
        <p className="font-righteous text-lg leading-relaxed mb-4 text-gray-700">
          Whether you’re planning a night out, attending a festival,
          or hosting your own event — BookKaro is built for you.
        </p>

        <p className="font-bungee text-lg text-[#98430e]">
          Let’s create memories, one event at a time 🎉
        </p>
      </div>

    </div>
  );
};

const Feature = ({ emoji, title, text }) => {
  return (
    <div
      className="
        bg-white p-6 rounded-2xl text-center
        border border-gray-200
        hover:border-[#98430e]/60
        hover:shadow-[0_0_0_2px_rgba(152,67,14,0.25)]
        transition-all duration-300
      "
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-righteous text-lg mb-2 text-[#98430e]">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default AboutUs;
