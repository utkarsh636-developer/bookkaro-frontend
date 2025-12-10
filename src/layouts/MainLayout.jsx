import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children, user, setUser  }) {
  return (
    <div>
      <Navbar user = {user} setUser={setUser} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;