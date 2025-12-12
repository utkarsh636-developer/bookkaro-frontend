import React from "react";
import { Navigate } from "react-router-dom";

function AuthLayout({ children, user, authChecked }) {
  if (!authChecked) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default AuthLayout;