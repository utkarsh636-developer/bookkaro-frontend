import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function TicketPage() {
  const { id } = useParams(); // eventId from URL
  const location = useLocation();
  const ticketRef = useRef();

  // Extract quantity from query string (?quantity=2)
  const queryParams = new URLSearchParams(location.search);
  const quantityParam = parseInt(queryParams.get("quantity"), 10) || 1;

  const [eventData, setEventData] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`/api/payment/success/${id}?quantity=${quantityParam}`, {
          credentials: 'include' 
        });

        if (!res.ok) {
          if (res.status === 401) {
            console.error("Authentication error: Not logged in. Redirecting...");
            window.location.href = "/login";
            return; 
          }
   
          throw new Error(`Server responded with an error: ${res.status}`);
        }

        const data = await res.json();
        setEventData(data);
        setTicketId("TICKET-" + uuidv4().slice(0, 8).toUpperCase());
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      }
    };

    fetchTicket();
  }, [id, quantityParam]);

  const downloadTicket = async () => {
      const element = ticketRef.current;

      if (!element) {
        console.error("Ticket DOM element not found.");
        return;
      }

      setIsDownloading(true);

      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true, // Important for images from other domains
          backgroundColor: '#ffffff' // Set a white background for the canvas
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${ticketId}.pdf`);
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      } finally {
        setIsDownloading(false); // Ensure the button is re-enabled even if an error occurs
      }
  };

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

      <div
        ref={ticketRef}
        className="bg-white shadow-2xl rounded-xl overflow-hidden max-w-md w-full"
      >
        {event.image && (
          <img
            src={`data:image/jpeg;base64,${event.image}`}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}

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
          <button
            onClick={downloadTicket}
            className={`mt-6 px-6 py-2 rounded-md shadow transition
                ${eventData ? "bg-[#98430e] text-white hover:bg-[#b85c21]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            Download Ticket
          </button>
    </div>
  );
}

export default TicketPage;
