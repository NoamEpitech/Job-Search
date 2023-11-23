import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/AdminPage" className="nav-link">Admin</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/SignIn" className="nav-link">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="/SignUp" className="nav-link">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
