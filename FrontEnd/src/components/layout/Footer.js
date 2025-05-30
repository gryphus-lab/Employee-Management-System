// src/components/layout/Footer.js

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer py-3 bg-dark text-white shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side: copyright */}
        <span className="mb-2 mb-md-0">
          Employee Management System &copy; {new Date().getFullYear()}
        </span>

        {/* Right side: optional links */}
        <div>
          <a href="/privacy" className="text-white me-3 text-decoration-none">
            Privacy
          </a>
          <a href="/terms" className="text-white me-3 text-decoration-none">
            Terms
          </a>
          <a
            href="https://github.com/BuAshraf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
