import React from 'react'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar';
import StackedCard from './components/StackedCard';
import './index.css';

function App() {
  const user = false;
  return (
    <div>
      <Navbar />
      <LandingPage />
      <StackedCard />
    </div>
  )
}

export default App