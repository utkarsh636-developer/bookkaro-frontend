import React from 'react';
import api from "./api";
import { useEffect, useState } from "react";
import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LandingPage from './components/LandingPage';
import Events from './components/Events';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import BookedTickets from "./components/BookedTickets";
import EventDetails from './components/EventDetails';
import TicketsPricePage from "./components/TicketsPricePage";
import QuantityPage from './components/QuantityPage';
import TotalAmount from "./components/TotalAmount"; 
import PaymentDetails from "./components/PaymentDetails";
import TicketPage from "./components/TicketPage";
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ScrollToTop from "./components/ScrollToTop";
// import AdminLogin from './components/adminLogin';
// import Test from "./components/Test";
// import UploadEvents from "./components/UploadEvents";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";
// import PrivateRoute from './components/PrivateRoute';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.events || [];
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]); // fallback to empty array
      });
  }, []);

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    api.get("/api/users/checkLogin", {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache"
      }
    })
      .then(res => {
        if (res.data.loggedIn && res.data.role === "user") {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home page with events */}
        <Route
          path="/"
          element={
            <MainLayout user = {user} setUser={setUser}>
              <LandingPage />
              {events.length === 0 ? (
                <p className="text-center mt-10">Loading events...</p>
              ) : (
                <Events events={events} />
              )}
            </MainLayout>
          }
        />

        {/* About Us */}
        <Route
          path="/aboutus"
          element={
            <MainLayout user = {user} setUser={setUser}>
              <AboutUs />
            </MainLayout>
          }
        />

        {/* Services */}
        <Route
          path="/services"
          element={
            <MainLayout user = {user} setUser={setUser}>
              <Services />
            </MainLayout>
          }
        />

        {/* Event Details page */}
        <Route
          path="/detailsPage/:id"
          element={
            <MainLayout user = {user} setUser={setUser}>
              <EventDetailsWrapper events={events} user={user} />
            </MainLayout>
          }
        />

        {/* Auth pages */}
        <Route
          path="/ticketPrices/:id"
          element={
            <AuthLayout>
              <TicketsPricePage events={events} />
            </AuthLayout>
          }
        />

        <Route
          path="/quantityPage/:id"
          element={            
            <AuthLayout>
              <QuantityPage events={events} />
            </AuthLayout>
          }
        />
     
        <Route
          path="/totalAmount/:id"
          element={
            <AuthLayout>
              <TotalAmount events={events} />
            </AuthLayout>
          }
        />

        <Route
          path="/paymentDetails/:id"
          element={
            <AuthLayout>
              <PaymentDetails events={events} razorpayKeyId="rzp_test_XXXX" />
            </AuthLayout>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <AuthLayout>
              <TicketPage events={events} />
            </AuthLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage setUser={setUser} />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />

        <Route
          path="/myevents"
          element={
            <AuthLayout>
              <BookedTickets key={user?._id} user={user} />
            </AuthLayout>
          }
        />
        
      </Routes>
    </>  
      

  );
}

function EventDetailsWrapper({ events, user }) {
  const { id } = useParams(); 
  const event = events.find(e => String(e._id) === id); 
  if (!event) return <p>Event not found</p>;
  return <EventDetails event={event} user={user} />;
}

export default App;
