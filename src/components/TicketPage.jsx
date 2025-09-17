import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useLocation, Link } from "react-router-dom";

function TicketPage() {
  const { id } = useParams(); // eventId from URL
  const location = useLocation();

  // Extract quantity from query string (?quantity=2)
  const queryParams = new URLSearchParams(location.search);
  const quantityParam = parseInt(queryParams.get("quantity"), 10) || 1;

  const [eventData, setEventData] = useState(null);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Fetch ticket details from backend
        const res = await fetch(`/api/paymentSuccess/${id}?quantity=${quantityParam}`, {
          credentials: 'include' 
        });

        // 2. Check the response status BEFORE trying to parse JSON
        if (!res.ok) {
          // If not logged in, the server should send a 401 Unauthorized status
          if (res.status === 401) {
            console.error("Authentication error: Not logged in. Redirecting...");
            // Redirect the user to the login page from the frontend
            window.location.href = "/login";
            return; // Stop the function here
          }
          // Handle other potential server errors
          throw new Error(`Server responded with an error: ${res.status}`);
        }

        const data = await res.json();

        setEventData(data);

        // Generate unique ticket ID
        setTicketId("TICKET-" + uuidv4().slice(0, 8).toUpperCase());
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      }
    };

    fetchTicket();
  }, [id, quantityParam]);

  if (!eventData) return <p className="text-center mt-10">Loading ticket...</p>;

  const { event, quantity, totalPrice } = eventData;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <Link
        to="/"
        className="absolute top-6 right-6 px-4 py-2 bg-[#98430e] text-white rounded-md shadow hover:bg-[#b85c21] transition"
      >
        Home
      </Link>

      <div className="text-center mb-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Your ticket(s) have been booked
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Thank you for booking with us. Here's your ticket!
        </p>
      </div>

      <div className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-md w-full">
        {/* Event banner */}
        <img
          src={`data:image/jpeg;base64,${event.image}`} // base64 image from backend
          alt="Event Banner"
          className="w-full h-48 object-cover"
        />

        <div className="p-6 space-y-4 text-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#98430e]">{event.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Category</p>
              <p>{event.category}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Location</p>
              <p>{event.location}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Date</p>
              <p>{new Date(event.date).toDateString()}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Time</p>
              <p>{event.time}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Quantity</p>
              <p>{quantity}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Price</p>
              <p>₹ {totalPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Age Limit</p>
              <p>{event.ageLimit}+</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Language</p>
              <p>{event.language}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-gray-700">Ticket ID</p>
              <p>{ticketId}</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center pt-4">
            <QRCodeCanvas value={ticketId} size={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketPage;
