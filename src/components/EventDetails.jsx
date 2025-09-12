import React from "react";

function EventDetails({ event }) {
  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10 md:mt-20 px-4 sm:px-3 md:px-4 lg:px-10 xl:px-40">
      <div>
        <p className="font-semibold text-gray-900 text-3xl md:text-4xl">
          {event.title}
        </p>
        <p className="inline-block bg-[#98430e] text-white text-sm font-medium px-3 py-1 rounded mt-2">
          {event.category}
        </p>
      </div>

      <div className="mt-5 flex flex-col md:flex-row md:gap-4 lg:gap-10">
        <div className="w-full md:w-2/3 mb-8">
          <img
            className="rounded-2xl w-full h-full max-h-[400px] object-cover"
            src={event.image}
            alt={event.title}
          />
        </div>

        <div className="border-2 rounded-2xl p-4 w-full md:w-1/3 break-words flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 
                  2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 
                  0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 
                  0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 
                  5.25 9h13.5A2.25 2.25 0 0 1 21 
                  11.25v7.5"
              />
            </svg>
            <p className="text-gray-700 text-lg">
              {new Date(event.date).toDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 
                  1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-gray-700 text-lg">{event.time}</p>
          </div>

          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 
                  4.125-8.25 4.125S3.75 8.653 
                  3.75 6.375m16.5 0c0-2.278-3.694-4.125-
                  8.25-4.125S3.75 4.097 
                  3.75 6.375m16.5 0v11.25c0 
                  2.278-3.694 4.125-8.25 
                  4.125s-8.25-1.847-8.25-4.125V6.375"
              />
            </svg>
            <p className="text-gray-700 text-lg">
              Age Limit: {event.ageLimit}+
            </p>
          </div>

          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <p className="text-gray-700 text-lg">
              Language: {event.language}
            </p>
          </div>

          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <p className="text-gray-700 text-lg">{event.category}</p>
          </div>

          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <p className="text-gray-700 text-lg">{event.location}</p>
          </div>

          <div className="mt-2 border-t-2 flex justify-between items-center px-2 pt-2 md:pt-4 ">
            <div>
              <p className="font-semibold text-gray-700 text-2xl">
                ₹ {event.price}
              </p>
            </div>

            <button className="bg-[#98430e] hover:bg-[#7a360c] text-white md:text-lg lg:text-xl font-semibold py-2 md:py-2 px-4 md:px-2 lg:px-4 rounded">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-16">
        <p className="font-semibold text-gray-800 text-xl md:text-2xl">
          Description
        </p>
        <p className="mt-2 text-gray-700 text-md md:text-lg">
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default EventDetails;
