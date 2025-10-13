import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

function TicketPage() {
  const { id } = useParams(); // eventId from URL
  const location = useLocation();
  const ticketRef = useRef();

  // Extract quantity from query string (?quantity=2)
  const queryParams = new URLSearchParams(location.search);
  const ticketType  = queryParams.get("type");
  const quantityParam = parseInt(queryParams.get("quantity"), 10) || 1;

  const [eventData, setEventData] = useState(null);
  const [ticketId, setTicketId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
       console.log("id:", id, "quantity:", quantityParam, "ticketType:", ticketType);
      try {
        const res = await fetch(`/api/payment/success/${id}?quantity=${quantityParam}&type=${ticketType }`, {
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
        if (data.tickets && data.tickets.length > 0) {
          setTicketId(data.tickets[0].ticketId); // pick first ticket
        } else {
          setTicketId(""); // fallback
        }
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
      }
    };

    fetchTicket();
  }, [id, quantityParam, ticketType]);

  const downloadTicket = async () => {
    const element = ticketRef.current;

    if (!element) {
      console.error("Ticket DOM element not found.");
      return;
    }

    setIsDownloading(true);

    try {
      const scale = 2; // Balanced scale
      const width = element.offsetWidth * scale;
      const height = element.offsetHeight * scale;

      const dataUrl = await domtoimage.toJpeg(element, {
        quality: 0.95,
        width,
        height,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
        },
        bgcolor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();  // ~210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // ~297mm

      // Calculate the ratio to fit ticket into A4 without cropping
      const imgProps = {
        width: width,
        height: height,
      };

      const pxPerMm = width / pdfWidth;
      const imgHeightInMm = height / pxPerMm;

      // Avoid cutting: center vertically if image is shorter than A4
      const yOffset = (pdfHeight - imgHeightInMm) / 2;

      pdf.addImage(dataUrl, "JPEG", 0, yOffset > 0 ? yOffset : 0, pdfWidth, imgHeightInMm);
      pdf.save(`${ticketId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };


  if (!eventData) return <p className="text-center mt-10">Loading ticket...</p>;

  const { event, quantity, totalPrice } = eventData;

  const GST_RATE = 0.18;
  const totalPriceWithGST = totalPrice * (1 + GST_RATE);

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
        style={{
          color: "#000",
          backgroundColor: "#fff",
        }}
      >

        <div className="flex items-center justify-center py-2 space-x-3">
          <img
            src="/images/main_logo.png"
            className="h-10 w-10 rounded-xl"
            alt="Logo"
          />
          <span className="text-xl font-bold text-[#98430e]">bookkaro</span>
        </div>
        
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
              <p className="font-semibold text-gray-700">Quantity</p>
              <p>{quantity}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Ticket Type</p>
              <p>{eventData.ticketType}</p>
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
              <p>₹ {totalPriceWithGST.toFixed(2)} <span className="text-sm">(incl. GST)</span></p>
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
        disabled={isDownloading}
        className={`mt-6 px-6 py-3 text-lg rounded-xl shadow-lg transition cursor-pointer ${
          isDownloading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#98430e] text-white hover:bg-[#b85c21]"
        }`}
      >
        {isDownloading ? "Downloading..." : "Download Ticket"}
      </button>
    </div>
  );
}

export default TicketPage;
