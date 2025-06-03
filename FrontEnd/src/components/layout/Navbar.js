// src/components/layout/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        {/* Brand always links to “home” (your Home page) */}
        <Link className="navbar-brand" to="/">
          Employee Management System
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav items */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/employees">
                Employees
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/employees/add">
                Add Employee
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
