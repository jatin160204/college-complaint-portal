import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import logoo from "./assets/logoo.png";



const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    let users = JSON.parse(localStorage.getItem("users")) || {};
  
    if (role === "student") {
      if (!users[username]) {
        users[username] = { password, complaints: [] };
        localStorage.setItem("users", JSON.stringify(users));
        alert("New user registered.");
      }
  
      if (users[username].password === password) {
        localStorage.setItem("user", JSON.stringify({ username, role }));
        navigate("/Home");
      } else {
        alert("Incorrect password.");
      }
    } else if (role === "admin") {
      if (username === "admin" && password === "adminpass") {
        localStorage.setItem("user", JSON.stringify({ username, role }));
        navigate("/Home");
      } else {
        alert("Invalid admin credentials");
      }
    }
  };
  

  return (
    <div className="login-page">
      <button onClick={() => navigate("/")} className="back-button">
        BACK
      </button>
      <div className="login-container">
      <div className="img">
        <img className="logo" src={logoo} alt="Welcome" />
      </div>
        <h2 className="title">Log in, Let It Out <br /> We’re Listening (Sort of)!</h2>
        <div className="white">
          <h2>Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <p>Login as</p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              <p>Username</p>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username"
              />
              <p>Password</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pass"
              />

              <label className="checkbox">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="label-text">Show Password</span>
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
