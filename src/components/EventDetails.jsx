import React from "react";
import { useNavigate } from "react-router-dom";

function EventDetails({ event }) {
  const navigate = useNavigate();
  
  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-24 md:mt-42 px-4 sm:px-3 md:px-4 lg:px-10 xl:px-40">
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
              className="w-6 h-6"
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
              className="w-6 h-6"
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
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375
                  m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375
                  m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375
                  m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75
                  m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            <p className="text-gray-700 text-lg">Age Limit: {event.ageLimit}+</p>
          </div>


    
          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
              />
            </svg>
            <p className="text-gray-700 text-lg">Language: {event.language}</p>
          </div>

          
          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            <p className="text-gray-700 text-lg">{event.category}</p>
          </div>

       
          <div className="flex items-center gap-2 pb-2 lg:pb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p className="text-gray-700 text-lg">{event.location}</p>
          </div>


          <div className="mt-2 border-t-2 flex justify-between items-center px-2 pt-2 md:pt-4">
            <p className="font-semibold text-gray-700 text-2xl">₹ {event.price}</p>
            <button
              onClick={() => {
                // const user = localStorage.getItem("user");
                const token = localStorage.getItem("token");
                if (token) {
                  navigate(`/quantityPage/${event._id}`);
                } else {
                  navigate("/login", { state: { message: "You must login to book tickets" } });
                }
              }}
              className="bg-[#98430e] hover:bg-[#7a360c] text-white md:text-lg lg:text-xl font-semibold py-2 md:py-2 px-4 md:px-2 lg:px-4 rounded cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-16">
        <p className="font-semibold text-gray-800 text-xl md:text-2xl">Description</p>
        <p className="mt-2 text-gray-700 text-md md:text-lg">{event.description}</p>
      </div>
    </div>
  );
}

export default EventDetails;
