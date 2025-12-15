import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function TotalAmount({ events }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const quantity = parseInt(queryParams.get("quantity"), 10) || 1;
  const ticketType = queryParams.get("type");

  const event = events.find((e) => e._id === id);
  if (!event) return <p>Event not found</p>;

  const selectedTicket = event.tickets?.find((t) => t.type === ticketType);
  const pricePerTicket = selectedTicket ? selectedTicket.price : 0;
  const totalPrice = pricePerTicket * quantity;

  const GST_RATE = 0.18;
  const CONVENIENCE_FEE_RATE = 0.02;

  const gstAmount = totalPrice * GST_RATE;
  const convenienceFee = totalPrice * CONVENIENCE_FEE_RATE;
  const finalAmount = totalPrice + gstAmount + convenienceFee;

  const handleProceed = () => {
    navigate(
      `/paymentDetails/${id}?quantity=${quantity}&type=${selectedTicket.type}&finalAmount=${finalAmount}`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[450px] max-w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-[#98430e] mb-6 text-center">
            Order Summary
          </h2>

          {/* Event Details */}
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold">{event.title}</p>
            <p className="text-sm text-gray-500">
              {event.location} · {new Date(event.date).toDateString()} · {event.time}
            </p>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
            <span className="font-medium">Quantity</span>
            <span className="font-semibold">{quantity}</span>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <span>Ticket Base Price</span>
              <span className="font-semibold">₹ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <span>GST (18%)</span>
              <span className="font-semibold">₹ {gstAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <span>Convenience Fee (2%)</span>
              <span className="font-semibold">₹ {convenienceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center p-5 bg-[#98430e1a] rounded-lg shadow-md border-t-2 border-[#98430e]">
              <span className="text-lg font-bold">Total Payable</span>
              <span className="text-xl font-extrabold text-[#98430e]">₹ {finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="mt-8 w-full py-3 text-lg font-semibold text-white rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            style={{ backgroundColor: "#98430e" }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default TotalAmount;
