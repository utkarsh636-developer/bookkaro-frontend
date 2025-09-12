import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;