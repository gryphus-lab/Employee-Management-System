import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-users me-2"></i>
          Employee Management System
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav items */}
        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                <i className="fas fa-tachometer-alt me-1"></i>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive('/employees')}`} to="/employees">
                <i className="fas fa-users me-1"></i>
                Employees
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive('/employees/add')}`} to="/employees/add">
                <i className="fas fa-user-plus me-1"></i>
                Add Employee
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive('/reports')}`} to="/reports">
                <i className="fas fa-chart-bar me-1"></i>
                Reports
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive('/settings')}`} to="/settings">
                <i className="fas fa-cog me-1"></i>
                Settings
              </Link>
            </li>
          </ul>

          {/* Right side items */}
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle me-1"></i>
                Admin
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fas fa-user me-2"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}