// src/App.js
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// lazily-loaded pages / views
import { lazyLoad } from './utils/lazyLoad';

// lazily-loaded layout components
const Navbar = lazyLoad(() => import('./components/layout/Navbar'));
const Footer = lazyLoad(() => import('./components/layout/Footer'));
const PageHeader = lazyLoad(() => import('./components/layout/PageHeader'));



// lazy components
const Home = lazyLoad(() => import('./components/pages/Home'));
const EmployeeList = lazyLoad(() => import('./components/employee/EmployeeList'));
const AddEmployee = lazyLoad(() => import('./components/employee/AddEmployee'));
const UpdateEmployee = lazyLoad(() => import('./components/employee/UpdateEmployee'));
const EmployeeDetails = lazyLoad(() => import('./components/employee/EmployeeDetails'));

function App() {
  return (
    <Router>
      {/* show a simple fallback while any chunk is downloading */}
      <Suspense fallback={<div className="text-center mt-5">Loading…</div>}>
        {/* top nav */}
        <Navbar />

        {/* main content */}
        <main className="container mt-3 mb-5">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PageHeader
                    title="All Employees"
                    subtitle="View, edit or delete your team members below."
                  />
                  <Home />
                </>
              }
            />

            <Route
              path="/employees"
              element={
                <>
                  <PageHeader
                    title="Employee List"
                    subtitle="Manage your employees here."
                  />
                  <EmployeeList />
                </>
              }
            />

            <Route
              path="/employees/add"
              element={
                <>
                  <PageHeader
                    title="Add New Employee"
                    subtitle="Enter the details of the new employee."
                  />
                  <AddEmployee />
                </>
              }
            />

            <Route
              path="/employees/edit/:id"
              element={
                <>
                  <PageHeader
                    title="Edit Employee"
                    subtitle="Update the employee’s information."
                  />
                  <UpdateEmployee />
                </>
              }
            />

            <Route
              path="/employees/view/:id"
              element={
                <>
                  <PageHeader title="Employee Details" />
                  <EmployeeDetails />
                </>
              }
            />

            {/* catch‐all → go home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored" // options: "light", "dark", "colored"
          hideProgressBar={false}
          closeOnClick
        />



        {/* footer */}
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
