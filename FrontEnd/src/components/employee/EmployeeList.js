import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import SearchEmployee from './SearchEmployee';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  // Fetch all employees
  const loadEmployees = async () => {
    try {
      const res = await EmployeeService.getAllEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError(`Failed to load employees: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Delete
  const deleteEmployee = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await EmployeeService.deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError(`Failed to delete: ${err.message}`);
    }
  };

  // Search & clear callbacks
  const handleSearch      = results => setEmployees(results);
  const handleClearSearch = ()      => { setLoading(true); setError(null); loadEmployees(); };

  if (loading) return <div className="text-center mt-5">Loading…</div>;
  if (error)   return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-1">
        <i className="fas fa-users fa-lg me-2 text-primary" aria-hidden="true"></i>
        <h2 className="mb-0 fw-bold">Employee Management</h2>
        <div className="ms-auto">
          <Link to="/employees/add" className="btn btn-outline-primary px-4">
            + Add Employee +
          </Link>
        </div>
      </div>

      <SearchEmployee onSearch={handleSearch} onClear={handleClearSearch} />

      {employees.length === 0 ? (
        <div className="alert alert-info">No employees found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Department</th>
                <th className="text-end">Salary</th>
                <th className="text-end">Bonus</th>
                <th className="text-end">Vacation Days</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.username}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td className="text-end">{emp.salary?.toLocaleString()}</td>
                  <td className="text-end">{emp.bonus?.toLocaleString()}</td>
                  <td className="text-end">{emp.annualVacationDays}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <Link
                        to={`/employees/view/${emp.id}`}
                        className="btn btn-outline-info px-4 py-1 fw-bold"
                      >
                        View
                      </Link>
                      <Link
                        to={`/employees/edit/${emp.id}`}
                        className="btn btn-outline-primary px-4 py-1 fw-bold"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger px-4 py-1 fw-bold"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
