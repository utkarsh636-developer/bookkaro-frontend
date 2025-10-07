import React, { useEffect, useState } from "react";
import api from "../api";

function BookedTickets() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch logged-in user details
    api
        .get("/api/users/checkLogin")
        .then((res) => {
        if (res.data.loggedIn && res.data.user) {
            setUser(res.data.user);
            setTickets(res.data.user.bookedEvents || []); // ✅ tickets from user object
        }
        })
        .catch(() => {
        setUser(null);
        setTickets([]);
        });
    }, []);

  return (
    <div className="max-w-[1000px] mx-auto mt-28 px-4">
      {/* User Info Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 p-6 bg-white shadow-md rounded-lg border border-gray-200">
        {/* User Logo */}
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#98430e] text-white text-4xl font-semibold">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Name + Gmail */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-[#98430e]">
            {user?.fullname || "User Name"}
          </h2>
          <p className="text-gray-600">{user?.email || "user@gmail.com"}</p>
        </div>
      </div>

      {/* Tickets Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-[#98430e] mb-4">My Booked Tickets</h3>

        {tickets.length === 0 ? (
          <p className="text-gray-500 text-center">No tickets booked yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold text-[#98430e] mb-2">
                  {ticket.eventName}
                </h4>
                <p className="text-gray-700 text-sm">
                  Date: {ticket.date || "N/A"}
                </p>
                <p className="text-gray-700 text-sm">
                  Venue: {ticket.venue || "N/A"}
                </p>
                <p className="text-gray-700 text-sm">
                  Quantity: {ticket.quantity || 1}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookedTickets;
