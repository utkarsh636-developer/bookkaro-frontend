import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api"; // adjust path if needed

export default function QuantityPage({ events }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const maxQty = 10;
    const minQty = 1;

    // Load event: from props if available, otherwise fetch
    useEffect(() => {
        if (events && events.length > 0) {
        const found = events.find((e) => String(e._id) === id);
        setEvent(found || null);
        setLoading(false);
        } else {
        // fallback fetch if no events passed in
        api
            .get(`/events/${id}`)
            .then((res) => {
            setEvent(res.data);
            })
            .catch(() => setEvent(null))
            .finally(() => setLoading(false));
        }
    }, [id, events]);

    const updateQuantity = (value) => {
        if (value < minQty) value = minQty;
        if (value > maxQty) value = maxQty;
        setQuantity(value);
    };

    const handleIncrement = () => updateQuantity(quantity + 1);
    const handleDecrement = () => updateQuantity(quantity - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/detailsPage/paymentDetails/${id}?quantity=${quantity}&type=${selectedTicket.type}`);
    };

    // ---- RENDER ----
    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (!event) {
        return <p className="text-center mt-10">Event not found</p>;
    }

    // Get ticket type from query string
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const ticketType = params.get("type");

    // Find the selected ticket object
    const selectedTicket = event.tickets?.find(t => t.type === ticketType);

    // Use its price (fallback to 0 if not found)
    const pricePerTicket = selectedTicket ? selectedTicket.price : 0;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form className="text-center space-y-4" onSubmit={handleSubmit}>
            <label
            htmlFor="quantity-input"
            className="block text-base font-medium text-black"
            >
            Choose quantity:
            </label>

            <div className="relative flex items-center justify-center mx-auto max-w-[8rem]">
            <button
                type="button"
                onClick={handleDecrement}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-s-lg p-3 h-11 focus:ring-2 focus:outline-none focus:ring-gray-300"
            >
                <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 18 2"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h16" />
                </svg>
            </button>

            <input
                type="text"
                id="quantity-input"
                name="quantity"
                value={quantity}
                readOnly
                className="pointer-events-none bg-white border-x-0 border border-gray-300 h-11 text-center text-gray-800 text-sm focus:outline-none focus:ring-0 block w-full py-2.5"
                required
            />

            <button
                type="button"
                onClick={handleIncrement}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-e-lg p-3 h-11 focus:ring-2 focus:outline-none focus:ring-gray-300"
            >
                <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 18 18"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 1v16M1 9h16" />
                </svg>
            </button>
            </div>

            <p className="text-sm text-gray-600">
            Please select a number from {minQty} to {maxQty}.
            </p>

            <p className="mt-2 text-gray-700 font-semibold">
            Price: ₹ <span>{(pricePerTicket * quantity).toFixed(2)}</span>
            </p>

            <button
            type="submit"
            className="inline-block px-6 py-2 text-white font-semibold rounded bg-[#98430e] hover:opacity-90 transition cursor-pointer"
            >
            Continue
            </button>
        </form>
        </div>
    );
}
