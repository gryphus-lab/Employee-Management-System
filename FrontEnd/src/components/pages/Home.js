// src/components/pages/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8080/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to load employees:', err);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?'))
      return;
    try {
      await axios.delete(`http://localhost:8080/employees/${id}`);
      loadEmployees();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <>
      {/* Semantic page header */}
      <PageHeader className="mb-4">
        <h1 className="display-6">All Employees</h1>
        <p className="text-muted">
          View, edit or delete your team members below.
        </p>
      </PageHeader>

      <div className="container py-2">
        <table className="table table-bordered shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp.id}>
                <td>{idx + 1}</td>
                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <Link
                    to={`/employees/view/${emp.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    View
                  </Link>
                  <Link
                    to={`/employees/edit/${emp.id}`}
                    className="btn btn-sm btn-outline-primary me-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
