import React, { useEffect } from "react";
import WelcomePage from "./WelcomePage";

import { Routes, Route, useNavigate } from "react-router-dom";
import ComplaintForm from "./ComplaintForm";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import ComplaintHistory from "./ComplaintHistory";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
      if (!user) {
        navigate("/");
      } else {
        if (user.role === "admin") {
          console.log("Redirecting to AdminPage");
          navigate("/admin");
        } else {
          console.log("Redirecting to ComplaintForm");
          navigate("/complaint");
        }
      }
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/complainthistory" element={<ComplaintHistory />} />
      </Routes>
    </div>
  );
}

export default App;
