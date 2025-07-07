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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand with logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img 
            src="/logo11.png" 
            alt="EMS Logo" 
            style={{ width: '32px', height: '32px' }}
            className="me-2"
          />
          <span className="d-none d-sm-inline">Employee Management System</span>
          <span className="d-inline d-sm-none">EMS</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
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
              <Link className={`nav-link px-3 ${isActive('/')}`} to="/">
                <i className="fas fa-tachometer-alt me-1"></i>
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/employees')}`} to="/employees">
                <i className="fas fa-users me-1"></i>
                Employees
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/employees/add')}`} to="/employees/add">
                <i className="fas fa-user-plus me-1"></i>
                Add Employee
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/reports')}`} to="/reports">
                <i className="fas fa-chart-bar me-1"></i>
                Reports
              </Link>
            </li>
          </ul>

          {/* Right side items */}
          <ul className="navbar-nav">
            {/* Quick Actions */}
            <li className="nav-item dropdown me-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="quickActionsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-bolt me-1"></i>
                <span className="d-none d-lg-inline">Quick Actions</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/employees/add">
                    <i className="fas fa-user-plus me-2 text-primary"></i>Add Employee
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/reports">
                    <i className="fas fa-chart-line me-2 text-success"></i>View Reports
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-download me-2 text-info"></i>Export Data
                  </a>
                </li>
              </ul>
            </li>

            {/* User Profile */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '28px', height: '28px' }}>
                  <i className="fas fa-user text-primary" style={{ fontSize: '14px' }}></i>
                </div>
                <span className="d-none d-lg-inline">Admin</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="dropdown-header">
                    <strong>Administrator</strong>
                    <br />
                    <small className="text-muted">admin@ems.com</small>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <i className="fas fa-user me-2"></i>My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-question-circle me-2"></i>Help & Support
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item text-danger" href="#" onClick={(e) => e.preventDefault()}>
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