import React from 'react';
import { useEffect, useState } from "react";
import api from "./api";
import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LandingPage from './components/LandingPage';
import Events from './components/Events';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import EventDetails from './components/EventDetails';
import QuantityPage from './components/QuantityPage';
import PaymentDetails from "./components/PaymentDetails";
import TicketPage from "./components/TicketPage";
// import PrivateRoute from './components/PrivateRoute';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then((res) => {
        // res is only defined inside this callback
        console.log("Events API raw response:", res.data);

        const data = Array.isArray(res.data) ? res.data : res.data?.events || [];
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]); // fallback to empty array
      });
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/api/users/checkLogin") 
      .then(res => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  return (
   
      <Routes>
        {/* Home page with events */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
              {events.length === 0 ? (
                <p className="text-center mt-10">Loading events...</p>
              ) : (
                <Events events={events} />
              )}
            </MainLayout>
          }
        />

        {/* Event Details page */}
        <Route
          path="/detailsPage/:id"
          element={
            <MainLayout>
              <EventDetailsWrapper events={events} />
            </MainLayout>
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
          path="/detailsPage/paymentDetails/:id"
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

        {/* Auth pages */}
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

      </Routes>

  );
}

function EventDetailsWrapper({ events }) {
  const { id } = useParams(); 
  const event = events.find(e => String(e._id) === id); 
  return event ? <EventDetails event={event} /> : <p>Event not found</p>;
}

export default App;
