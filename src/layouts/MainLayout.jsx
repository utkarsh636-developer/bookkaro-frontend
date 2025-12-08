import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children, user }) {
  return (
    <div>
      <Navbar user = {user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;