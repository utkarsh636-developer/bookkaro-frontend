// // src/components/PrivateRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function PrivateRoute({ children }) {
//   const { auth } = useAuth();

//   if (auth.loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   return auth.isAuthenticated ? children : <Navigate to="/admin/login" replace />;
// }
