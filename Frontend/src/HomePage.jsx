import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  const handleDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem("user")); // Get latest user info
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
    <div>
      <Navbar />

      <section className="first">
        <h2 className="text-xl font-semibold">Welcome,</h2>
        <p id="five">
          "You’ve Got the Power to Make Change — Let’s Get Started!"
        </p>
        <p>
          {" "}
          <span id="one">Welcome to your dashboard! </span>
          <br />
          <span id="two">
            {" "}
            It's your very own space to complain, track your complaints, and get
            things fixed!{" "}
          </span>
          <br />
          <span id="three">
            Whether it's the noisy canteen or the Wi-Fi that’s slower than a
            snail,{" "}
          </span>{" "}
          <br />
          <span id="four">we’re all ears (and ready to help) </span>
        </p>
      </section>
      <div className="home">
        <section className="second">
          <h2 className="text-xl font-semibold">Here’s What You Can Do:</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>
              File a Complaint: Got something bugging you? Let us know — we’ve
              got your back! 😎
            </li>
            <li>
              Track Your Complaints: Keep an eye on your issues. We promise
              we’re not ignoring you
            </li>
            <li>
              Get Updates: Stay in the loop — know exactly when your complaint
              gets resolved or needs more info!
            </li>
          </ul>
        </section>

        <section className="third">
          <h2 className="text-xl font-semibold">Why Use It?</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>
              No More Waiting Around: Submit complaints anytime, anywhere.
            </li>
            <li>
              Track and Follow Up: Stay updated on the progress of your
              complaint.
            </li>
            <li>
              Your Voice Matters: We take every concern seriously — together, we
              make the campus better!
            </li>
          </ul>
        </section>

        <section className="fourth">
          <h2 className="text-xl font-semibold">Why It’s Awesome:</h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Easy and efficient way to handle complaints.</li>
            <li>A transparent system for students and admins.</li>
            <li>
              Your concerns are directly handled by the people who can make a
              change.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
