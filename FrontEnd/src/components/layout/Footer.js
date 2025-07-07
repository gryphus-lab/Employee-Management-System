import React from 'react';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row align-items-center">
          {/* Left side: Logo and company info */}
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2 mb-md-0">
              <img 
                src="/logo11.png" 
                alt="EMS Logo" 
                style={{ width: '40px', height: '40px' }}
                className="me-3"
              />
              <div>
                <h6 className="mb-0 fw-bold">Employee Management System</h6>
                <small className="text-muted">Streamlining workforce management</small>
              </div>
            </div>
          </div>

          {/* Right side: Links and copyright */}
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex flex-wrap justify-content-md-end">
                  <a href="/privacy" className="text-white-50 text-decoration-none me-3 mb-1">
                    <i className="fas fa-shield-alt me-1"></i>Privacy Policy
                  </a>
                  <a href="/terms" className="text-white-50 text-decoration-none me-3 mb-1">
                    <i className="fas fa-file-contract me-1"></i>Terms of Service
                  </a>
                  <a href="/support" className="text-white-50 text-decoration-none me-3 mb-1">
                    <i className="fas fa-life-ring me-1"></i>Support
                  </a>
                  <a
                    href="https://github.com/BuAshraf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white-50 text-decoration-none mb-1"
                  >
                    <i className="fab fa-github me-1"></i>GitHub
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-md-end">
                  <small className="text-muted">
                    &copy; {new Date().getFullYear()} EMS. All rights reserved.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <hr className="my-3 border-secondary" />
        <div className="row">
          <div className="col-md-6">
            <small className="text-muted">
              <i className="fas fa-code me-1"></i>
              Built with React & Spring Boot
            </small>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              Version 1.0.0 | 
              <a href="/changelog" className="text-white-50 text-decoration-none ms-1">
                What's New
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}