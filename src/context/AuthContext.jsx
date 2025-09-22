// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     isAuthenticated: false,
//     role: null,
//     token: null,
//     loading: true,
//   });

//   // ✅ update auth state after login
//   const login = (role, token) => {
//     console.log("Auth after login:", data.role, data.token);
//     localStorage.setItem("authToken", token); // save token
//     setAuth({
//       isAuthenticated: true,
//       role,
//       token,
//       loading: false,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     setAuth({
//       isAuthenticated: false,
//       role: null,
//       token: null,
//       loading: false,
//     });
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await fetch("/api/admin/checkAuth", {
//           credentials: "include", // ✅ send cookie
//         });
//         const data = await res.json();
//         console.log("checkAuth response:", data);

//         if (res.ok && data.authenticated) {
//           setAuth({
//             isAuthenticated: true,
//             role: data.role || "user",
//             token: data.token || localStorage.getItem("authToken"),
//             loading: false,
//           });
//         } else {
//           // fallback to localStorage token if cookie check fails
//           const savedToken = localStorage.getItem("authToken");
//           if (savedToken) {
//             setAuth({
//               isAuthenticated: true,
//               role: "admin",
//               token: savedToken,
//               loading: false,
//             });
//           } else {
//             setAuth({ isAuthenticated: false, role: null, token: null, loading: false });
//           }
//         }
//       } catch (err) {
//         console.error("Auth check failed:", err);
//         setAuth({ isAuthenticated: false, role: null, token: null, loading: false });
//       }
//     };

//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
