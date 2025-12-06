import React from "react";

const Services = () => {
  return (
    <div className="container mx-auto mt-24 md:mt-32 py-10 px-4 sm:px-3 md:px-4 lg:px-10 xl:px-20 2xl:px-40">

      {/* Hero */}
      <div className="mb-14">
        <h1 className="font-bungee text-3xl sm:text-4xl md:text-5xl text-[#98430e] mb-6">
          Our Services
        </h1>

        <p className="font-righteous text-lg sm:text-xl leading-relaxed text-gray-700 max-w-4xl">
          Everything you need to discover, book, and manage events — all in one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <ServiceCard
          emoji="🎟️"
          title="Event Ticket Booking"
          text="Book tickets for concerts, shows, workshops, and festivals with a fast and secure checkout experience."
        />
        <ServiceCard
          emoji="🔍"
          title="Event Discovery"
          text="Explore trending and upcoming events across cities in India — tailored to your interests."
        />
        <ServiceCard
          emoji="📍"
          title="Pan-India Coverage"
          text="From metro cities to emerging hubs, BookKaro helps you find events wherever you are."
        />
        <ServiceCard
          emoji="💳"
          title="Secure Payments"
          text="Multiple payment methods with complete transparency and industry-grade security."
        />
        <ServiceCard
          emoji="🧾"
          title="Digital Tickets"
          text="Receive tickets instantly after booking — no paperwork, no hassle."
        />
        <ServiceCard
          emoji="📊"
          title="Organizer Support"
          text="Tools and insights for event organizers to manage tickets, sales, and audiences effectively."
        />
      </div>

      {/* Highlight Section */}
      <div className="bg-[#98430e] rounded-3xl p-8 sm:p-10 text-white mb-20">
        <h2 className="font-bungee text-2xl sm:text-3xl mb-4">
          Built for Experiences
        </h2>
        <p className="font-righteous text-base sm:text-lg leading-relaxed max-w-4xl">
          Whether you’re attending an event or hosting one, our services are designed
          to keep things simple, fast, and reliable — so you can focus on what matters most.
        </p>
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
          At BookKaro, we don’t just sell tickets — we help create unforgettable moments.
        </p>

        <p className="font-bungee text-lg text-[#98430e]">
          Your journey starts here 🎉
        </p>
      </div>

    </div>
  );
};

const ServiceCard = ({ emoji, title, text }) => {
  return (
    <div
      className="
        bg-white rounded-2xl p-7
        border border-gray-200
        hover:border-[#98430e]/60
        hover:shadow-[0_0_0_2px_rgba(152,67,14,0.25)]
        transition-all duration-300
        text-center
      "
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="font-righteous text-xl mb-3 text-[#98430e]">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default Services;
