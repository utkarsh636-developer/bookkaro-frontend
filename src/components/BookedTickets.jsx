import React, { useEffect, useState } from "react";
import api from "../api";

function BookedTickets() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
  const fetchTickets = async () => {
    try {
      const loginRes = await api.get("/api/users/checkLogin");
      if (loginRes.data.loggedIn && loginRes.data.user) {
        const loggedUser = loginRes.data.user;
        setUser(loggedUser);

        // Fetch booked tickets using the populated route
        const ticketsRes = await api.get(`/api/users/${loggedUser._id}/bookings`);
        setTickets(ticketsRes.data || []);
      } else {
        setUser(null);
        setTickets([]);
      }
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setUser(null);
      setTickets([]);
    }
  };

  fetchTickets();
}, []);

  return (
    <div className="max-w-[1000px] mx-auto mt-28 px-4">
      {/* User Info */}
      {user && (
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 p-6 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#98430e] text-white text-4xl font-semibold">
            {user.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-[#98430e]">{user.fullname}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      )}

      {/* Tickets Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-[#98430e] mb-4">My Booked Tickets</h3>
        {tickets.map((ticket) => (
  <div key={ticket._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
    <h4 className="text-lg font-semibold text-[#98430e] mb-2">
      {ticket.eventId?.title || "Event Name"}
    </h4>
    <p className="text-gray-700 text-sm">Date: {new Date(ticket.date).toLocaleDateString()}</p>
    <p className="text-gray-700 text-sm">Venue: {ticket.venue || ticket.eventId?.location || "N/A"}</p>
    <p className="text-gray-700 text-sm">Quantity: {ticket.quantity || 1}</p>
    <p className="text-gray-700 text-sm">Ticket Type: {ticket.ticketType}</p>
  </div>
))}

      </div>
    </div>
  );
}

export default BookedTickets;
