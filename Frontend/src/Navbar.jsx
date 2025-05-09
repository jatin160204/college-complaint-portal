import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/nav.css";
import logoo from "./assets/logoo.png";

   


const Navbar = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/complaint");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      
     
    <div className="buttons">
        <img className="logo" src={logoo} alt="Welcome" />
    <button
        onClick={() => navigate("/Home")}
      >
        Home
      </button>
      <button
        onClick={handleDashboard}
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/complainthistory")}
      >
        Complaint History
      </button>
      <button className="contact"
        onClick={() => navigate("/contact")}
      >
        Contact
      </button>
      <button className="logout"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  </nav>
  );
};

export default Navbar;
