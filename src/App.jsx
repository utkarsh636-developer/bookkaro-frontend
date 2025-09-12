import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar';
// import StackedCard from './components/StackedCard';
import Events from './components/Events';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {
  const user = false;

const events = [
  {
    _id: 1,
    title: "The Arijit Singh Concert",
    location: "Shivaji park, Mumbai",
    date: "2025-09-15",
    image: "/images/holi.jpg"
  },
  {
    _id: 2,
    title: "Atif Aslam's Melody Concert",
    location: "Azad Maidan, CSMT",
    date: "2025-10-01",
    image: "/images/holi.jpg"
  }
];


  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <LandingPage />
            <Events events={events} />
          </MainLayout>
        }
      />

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


export default App