import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function TicketPricePage({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find(e => String(e._id) === id);

  if (!event) return <p className="text-center mt-10">Event not found</p>;

  return (
    <div className="container mx-auto mt-24 px-4 sm:px-6 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Select Your Ticket
      </h2>

      <div className="space-y-4">
        {event.tickets?.map((ticket, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-white"
            onClick={() =>
              navigate(`/quantityPage/${event._id}`, {
                state: { ticketType: ticket.type, price: ticket.price }
              })
            }
          >
            <span className="text-lg md:text-xl font-medium text-gray-700">
              {ticket.type}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-semibold text-gray-900">
                ₹ {ticket.price}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
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
