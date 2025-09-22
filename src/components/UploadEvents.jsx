// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // ✅ 1. Import useAuth

// export default function AdminEventForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     description: "",
//     location: "",
//     date: "",
//     time: "",
//     price: "",
//     ageLimit: "",
//     language: "",
//     image: null,
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();
//   const { auth } = useAuth(); // ✅ 2. Get auth state from context

//   // ✅ 3. This useEffect now only checks the context state
//   useEffect(() => {
//     // If the context is done loading and the user is not an authenticated admin, redirect.
//     if (!auth.loading && (auth.role !== "admin" || !auth.isAuthenticated)) {
//       navigate("/admin/login");
//     }
//   }, [auth, navigate]); // Depend on the auth object and navigate

//   // ✅ Handle form changes (No changes needed here)
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Submit form (No changes needed here)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });

//       // The token should come from your context for consistency
//       const res = await fetch("/api/events/upload", {
//         method: "POST",
//         body: data,
//         credentials: 'include',
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         setError(result.error || "Something went wrong");
//       } else {
//         setSuccess("Event uploaded successfully!");
//         // Reset form...
//         setFormData({
//           title: "",
//           category: "",
//           description: "",
//           location: "",
//           date: "",
//           time: "",
//           price: "",
//           ageLimit: "",
//           language: "",
//           image: null,
//         });
//       }
//     } catch (err) {
//       setError("Error uploading event. Try again.");
//     }
//   };

//   // ✅ 4. Use the loading state from the context
//   if (auth.loading) {
//     return <div className="text-center p-6">Checking authentication...</div>;
//   }

//   // The JSX for the form is perfect and doesn't need changes.
//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
//       {/* ...your success and error messages... */}
//       {success && (
//         <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-green-500 text-white">
//           {success}
//         </div>
//       )}
//       {error && (
//         <div className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-red-500 text-white">
//           {error}
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-md max-w-5xl w-full p-8">
//         <h1 className="text-3xl font-semibold text-[#98430e] mb-8 text-center">
//           Admin Event Entry
//         </h1>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-2 gap-6"
//           encType="multipart/form-data"
//         >
//           {/* ... all your form inputs ... */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               required
//               value={formData.title}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Category *
//             </label>
//             <select
//               name="category"
//               required
//               value={formData.category}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             >
//               <option value="" disabled>
//                 Select category
//               </option>
//               <option>Singing</option>
//               <option>Dancing</option>
//               <option>Drama</option>
//               <option>Music</option>
//               <option>Comedy</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description *
//             </label>
//             <textarea
//               name="description"
//               rows="4"
//               required
//               value={formData.description}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             ></textarea>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Location *
//             </label>
//             <input
//               type="text"
//               name="location"
//               required
//               value={formData.location}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date *
//             </label>
//             <input
//               type="date"
//               name="date"
//               required
//               value={formData.date}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Time *
//             </label>
//             <input
//               type="time"
//               name="time"
//               required
//               value={formData.time}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Ticket Price (₹) *
//             </label>
//             <input
//               type="number"
//               name="price"
//               required
//               value={formData.price}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Age Limit *
//             </label>
//             <input
//               type="number"
//               name="ageLimit"
//               required
//               value={formData.ageLimit}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Language *
//             </label>
//             <input
//               type="text"
//               name="language"
//               required
//               value={formData.language}
//               onChange={handleChange}
//               className="block w-full rounded-md border px-3 py-2"
//             />
//           </div>

//           <div className="col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image *
//             </label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//               required
//               className="block w-full text-gray-700"
//             />
//           </div>

//           <div className="col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="w-full rounded-md py-3 font-semibold text-white bg-[#98430e] hover:bg-[#6e2f09]"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }