import { useNavigate } from "react-router-dom";

export default function Events({ events }) {
  const navigate = useNavigate();

  // Utility to format date
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  return (
    <div className="container mx-auto px-4 mt-10 md:mt-20 sm:px-6 md:px-10 lg:px-40">
      <div>
        <h1 className="font-semibold font-righteous text-3xl md:text-5xl">Events</h1>
        <span className="block h-[3px] w-16 bg-[#98430e] mt-1 mb-8"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 sm:gap-2 md:gap-4 lg:gap-8">
        {events.map((event) => {
          const { day, month } = formatDate(event.date);
          return (
            <div
              key={event._id}
              onClick={() => navigate(`/detailsPage/${event._id}`)}
              className="border-1 border-gray-300 rounded-xl flex flex-col h-full cursor-pointer hover:shadow-lg transition"
            >
              {/* Image fixed size */}
              <div className="w-full aspect-video overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>

              {/* Info */}
              <div className="p-3 flex-grow flex items-center justify-between">
                {/* Left side: Title + Location */}
                <div className="flex-1 pr-3">
                  <p className="font-semibold text-xl">{event.title}</p>
                  <p className="font-medium text-gray-700">{event.location}</p>
                </div>

                {/* Divider */}
                <div className="w-[1px] bg-gray-300 h-12 mx-2"></div>

                {/* Right side: Date + Month */}
                <div className="text-center w-12">
                  <span className="text-2xl font-bold block leading-none">{day}</span>
                  <span className="text-sm uppercase tracking-wide text-gray-600 block">
                    {month}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
