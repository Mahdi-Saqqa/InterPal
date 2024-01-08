import React from "react";
import "./Navbar.css"; // You can create a CSS file for styling
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/">
          {" "}
          <img className="logo ms-3"
            src="https://ik.imagekit.io/shadid/header-logo.svg?updatedAt=1700833918507"
            alt="Logo"
          />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Find a Tandem </Link>
        </li>
        <li>
          <Link to="/"> Blog</Link>
        </li>
      </ul>
      <div className="right-links">
        <div className="login">
          <Link to="/LoginPage">Log In</Link>
        </div>
        <div className="register me-3">
          <Link to="/RegisterPage">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
