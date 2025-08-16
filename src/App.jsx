import React from 'react'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const user = false;
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  )
}

export default App