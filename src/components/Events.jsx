import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Events({ events }) {
  const navigate = useNavigate();
  
  const safeEvents = Array.isArray(events) ? events : [];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Utility to format date
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  const categories = ["All", "Music", "Cultural", "Educational", "Sports", "Food", "Film", "Other"];

  // Filtered events
  const filteredEvents =
    selectedCategory === "All"
      ? safeEvents
      : safeEvents.filter((event) => event.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 mt-10 md:mt-20 sm:px-4 md:px-6 xl:px-25">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold font-righteous text-3xl sm:text-4xl md:text-5xl">Events</h1>
          <span className="block h-[3px] w-16 bg-[#98430e] mt-1 mb-8"></span>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 sm:gap-2 md:gap-4 xl:gap-8">
        {filteredEvents.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No events found
          </p>
        ) : (
          filteredEvents.map((event) => {
            const { day, month } = formatDate(event.date);
            return (
              <div
                key={event._id}
                onClick={() => navigate(`/detailsPage/${event._id}`)}
                className="border-1 border-gray-300 rounded-xl flex flex-col h-full cursor-pointer hover:shadow-lg transition"
              >
                <div className="w-full aspect-video overflow-hidden">
                  {event.image && (
                    <img
                      src={`data:image/jpeg;base64,${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  )}
                </div>

                <div className="p-3 flex-grow flex items-center justify-between">
                  <div className="flex-1 pr-3">
                    <p className="font-semibold text-xl">{event.title}</p>
                    <p className="font-medium text-gray-700">{event.location}</p>
                  </div>

                  <div className="w-[1px] bg-gray-300 h-12 mx-2"></div>

                  <div className="text-center w-12">
                    <span className="text-2xl font-bold block leading-none">{day}</span>
                    <span className="text-sm uppercase tracking-wide text-gray-600 block">
                      {month}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
