import React from 'react';
import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LandingPage from './components/LandingPage';
import Events from './components/Events';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import EventDetails from './components/EventDetails';

function App() {
  const events = [
    {
      _id: "1",
      title: "The Arijit Singh Concert",
      category: "Music",
      image: "/images/arijitSingh.jpg",
      date: "2025-09-15",
      time: "7:00 PM",
      ageLimit: 18,
      language: "Hindi",
      location: "Shivaji Park, Mumbai",
      price: 999,
      description: "An amazing evening with soulful music.",
    },
    {
      _id: "2",
      title: "Mumbai Marathon 2025",
      category: "Health",
      image: "/images/marathon.jpeg",
      date: "2025-10-05",
      time: "10:00 AM",
      ageLimit: 12,
      language: "English",
      location: "Nariman Point",
      price: 499,
      description: "India's largest technology exhibition.",
    },
  ];

  return (
   
      <Routes>
        {/* Home page with events */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
              <Events events={events} />
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

        {/* Auth pages */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
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
  const event = events.find(e => e._id === id); 
  return event ? <EventDetails event={event} /> : <p>Event not found</p>;
}

export default App;
