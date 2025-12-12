import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function BookedTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; 

    const fetchTickets = async () => {
      try {
        const ticketsRes = await api.get(
          `/api/users/${user._id}/bookings`
        );
        setTickets(ticketsRes.data || []);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
        setTickets([]);
      }
    };

    fetchTickets();
  }, [user]);

  const handleTicketClick = (ticket) => {
    const eventId = ticket.eventId?._id || ticket.eventId; // handle both populated & plain IDs
    const quantity = ticket.quantity || 1;
    const ticketType = ticket.ticketType || "General";
    navigate(`/ticket/${eventId}?quantity=${quantity}&type=${ticketType}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      {/* User Info */}
      {user && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#98430e] text-white text-4xl font-bold">
            {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-[#98430e]">{user.fullname}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      )}

      {/* Tickets Section */}
      <div className="mt-12 mb-12">
        <h3 className="text-3xl font-semibold text-[#98430e] mb-6">My Booked Tickets</h3>

        {tickets.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            You haven’t booked any tickets yet or refresh to fetch tickets.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => handleTicketClick(ticket)} // Redirect on click
                className="bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition duration-300 overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <h4 className="text-xl font-bold text-[#98430e] mb-2">
                    {ticket.eventId?.title || "Event Name"}
                  </h4>
                  <span className="inline-block mb-4 px-3 py-1 text-sm font-semibold rounded-full bg-[#98430e1a] text-[#98430e]">
                    {ticket.ticketType || "General"}
                  </span>

                  <div className="mb-2">
                    <p className="text-gray-500 text-sm">Date</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(ticket.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="text-gray-500 text-sm">Venue</p>
                    <p className="text-gray-800 font-medium">
                      {ticket.venue || ticket.eventId?.location || "N/A"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">Quantity</p>
                    <p className="text-gray-800 font-semibold">{ticket.quantity || 1}</p>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Ticket ID</p>
                    <p className="text-gray-800 font-mono text-sm">
                      {ticket.tickets?.[0]?.ticketId || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookedTickets;
