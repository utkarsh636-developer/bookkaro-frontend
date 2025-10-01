import React from "react";
import { useParams, useLocation } from "react-router-dom";

function PaymentPage({ events, razorpayKeyId }) {
  const { id } = useParams(); // eventId from URL
  const location = useLocation();

  // Get quantity and finalAmount from query string
  const queryParams = new URLSearchParams(location.search);
  const quantity = parseInt(queryParams.get("quantity"), 10) || 1;
  const ticketType = queryParams.get("type"); // ticket type from URL
  const finalAmount = parseFloat(queryParams.get("finalAmount")) || 0;

  // Find event by id
  const event = events.find((e) => e._id === id);
  if (!event) return <p className="text-center mt-10 text-gray-500">Event not found</p>;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
      try {
        const loaded = await loadRazorpay();
        if (!loaded) {
          alert("Failed to load Razorpay SDK. Check your internet connection.");
          return;
        }

        const totalAmount = Math.round(finalAmount * 100); 
        const response = await fetch("/createOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        });

        const orderData = await response.json();
        console.log("Order data:", orderData);

        const options = {
          key: orderData.razorpayKeyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency || "INR",
          name: event.title,
          description: "Ticket Purchase",
          order_id: orderData.order.id,
          handler: function () {
            window.location.href = `/ticket/${event._id}?quantity=${quantity}&type=${ticketType}`;
          },
          theme: { color: "#98430e" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (err) {
        console.error("Payment failed:", err);
        alert("Payment could not be initiated.");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[400px] max-w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#98430e]">{event.title}</h2>
            <span className="text-sm px-3 py-1 rounded-full bg-[#98430e1a] text-[#98430e]">
              {event.category}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-6">
            <svg
              className="w-5 h-5 mr-2 text-[#98430e]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {new Date(event.date).toDateString()} · {event.time}
            </span>
          </div>

          {/* Quantity & Price */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
            <div>
              <p className="text-gray-500 text-sm">Quantity</p>
              <p className="font-medium text-gray-800">{quantity} Tickets</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <p className="font-semibold text-gray-900">₹ {finalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Location</p>
            <p className="text-gray-800 font-medium">{event.location}</p>
          </div>

          {/* Age & Language */}
          <div className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm mb-6">
            <div>
              <p className="text-gray-500 text-sm">Age Limit</p>
              <p className="text-gray-800 font-medium">{event.ageLimit}+</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Language</p>
              <p className="text-gray-800 font-medium">{event.language}</p>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className="w-full py-3 text-lg font-semibold text-white rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            style={{ backgroundColor: "#98430e" }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
