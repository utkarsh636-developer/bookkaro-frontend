import { useState } from "react";
import { useParams } from "react-router-dom";

export default function QuantityPage({ events }) {
    const { id } = useParams();
    const event = events.find((e) => e._id === id);

    if (!event) return <p>Event not found</p>;

    const [quantity, setQuantity] = useState(1);

    const pricePerTicket = event.price;
    const maxQty = 999;
    const minQty = 1;

    const updateQuantity = (value) => {
        if (value < minQty) value = minQty;
        if (value > maxQty) value = maxQty;
        setQuantity(value);
    };

    const handleIncrement = () => {
        updateQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        updateQuantity(quantity - 1);
    };

    const handleInputChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
        setQuantity(minQty);
        } else {
        updateQuantity(val);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
            className="text-center space-y-4"
            method="post"
            action={`/detailsPage/paymentDetails/${event._id}`}
        >
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
                onChange={handleInputChange}
                className="bg-white border-x-0 border border-gray-300 h-11 text-center text-gray-800 text-sm focus:ring-gray-300 focus:border-gray-400 block w-full py-2.5"
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
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 1v16M1 9h16"
                />
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
            className="inline-block px-6 py-2 text-white font-semibold rounded bg-[#98430e] hover:opacity-90 transition"
            >
            Continue
            </button>
        </form>
        </div>
    );
}
