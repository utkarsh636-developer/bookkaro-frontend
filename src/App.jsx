import React from 'react'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar';
import StackedCard from './components/StackedCard';
import Events from './components/Events';
import { BrowserRouter } from "react-router-dom";
import './index.css';

function App() {
  const user = false;

const events = [
  {
    _id: 1,
    title: "Music Concert",
    location: "Mumbai",
    date: "2025-09-15",
    image: "/images/holi.jpg"
  },
  {
    _id: 2,
    title: "Art Exhibition",
    location: "Delhi",
    date: "2025-10-01",
    image: "/images/holi.jpg"
  }
];


  return (
    <div>
      <Navbar />
      <LandingPage />
      <Events events={events} /> {/* ✅ pass props here */}
    </div>
  );
}


export default App