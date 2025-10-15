import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import '../Styling/Navbar.css'

function Navbar() {
  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <img src={Logo} alt="Hospital Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Roles</a></li>
         <li><a href="#">Docs</a></li>
        <li>  <Link to="">
            {" "}
            <button className="btn-outline"> Sign Up</button>{" "}
          </Link>
          </li>
          <li>
          <Link to="">
            {" "}
            <button className="btn-filled"> Log In </button>{" "}
          </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
