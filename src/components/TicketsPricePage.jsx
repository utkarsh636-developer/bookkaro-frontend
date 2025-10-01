import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function TicketPricePage({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find(e => String(e._id) === id);

  if (!event) return <p className="text-center mt-10 text-gray-500">Event not found</p>;

  return (
    <div className="container mx-auto mt-24 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        Select Your Ticket
      </h2>

      <div className="space-y-5">
        {event.tickets?.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-5 border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#98430e] hover:bg-[#98430e1a] transition cursor-pointer bg-white"
            onClick={() =>
              navigate(`/quantityPage/${event._id}?type=${ticket.type}`, {
                state: { ticketType: ticket.type, price: ticket.price }
              })
            }
          >
            <div>
              <span className="text-lg md:text-xl font-semibold text-[#98430e]">
                {ticket.type}
              </span>
              <p className="text-sm text-gray-500 mt-1">Price per ticket</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-bold text-[#98430e]">
                ₹ {ticket.price}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#98430e"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketPricePage;
