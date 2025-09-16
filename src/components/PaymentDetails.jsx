import React from "react";
import { useParams, useLocation } from "react-router-dom";

function PaymentPage({ events, razorpayKeyId }) {
  const { id } = useParams(); // eventId from URL
  const location = useLocation();

  // Get quantity from query string
  const queryParams = new URLSearchParams(location.search);
  const quantity = parseInt(queryParams.get("quantity"), 10) || 1;

  // Find event by id
  const event = events.find((e) => e._id === id);
  if (!event) return <p>Event not found</p>;

  const pricePerTicket = parseFloat(event.price);
  const totalPrice = pricePerTicket * quantity;

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

        const totalAmount = Math.round(totalPrice * 100);
        // ✅ await is legal here
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
            window.location.href = `/ticket/${event._id}?quantity=${quantity}`;
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
      <div className="w-[360px] max-w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-[#98430e]">{event.title}</h2>
            <span className="text-sm px-2 py-1 rounded bg-[#98430e1a] text-[#98430e]">
              {event.category}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <svg
              className="w-4 h-4 mr-2 text-[#98430e]"
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

          <div className="flex justify-between mb-4 text-sm">
            <div>
              <p className="text-gray-500">Quantity</p>
              <p className="font-medium text-gray-700">{quantity} Tickets</p>
            </div>
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-medium text-gray-700">₹ {totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-sm font-medium text-gray-700">{event.location}</p>
          </div>

          <div className="flex justify-between text-sm mb-6">
            <div>
              <p className="text-gray-500">Age Limit</p>
              <p className="text-gray-700 font-medium">{event.ageLimit}+</p>
            </div>
            <div>
              <p className="text-gray-500">Language</p>
              <p className="text-gray-700 font-medium">{event.language}</p>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="block w-full text-center py-2 px-4 text-white font-semibold rounded-md shadow-sm transition duration-200 cursor-pointer"
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
