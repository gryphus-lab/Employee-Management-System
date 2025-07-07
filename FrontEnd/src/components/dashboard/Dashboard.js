import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EmployeeService from '../../services/EmployeeService';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalSalary: 0,
    avgSalary: 0,
    departments: {},
    positions: {},
    recentJoins: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await EmployeeService.getAllEmployees();
      const employeeData = response.data;
      setEmployees(employeeData);
      calculateStats(employeeData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (employeeData) => {
    const totalEmployees = employeeData.length;
    const totalSalary = employeeData.reduce((sum, emp) => sum + (parseFloat(emp.salary) || 0), 0);
    const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

    // Group by department
    const departments = employeeData.reduce((acc, emp) => {
      const dept = emp.department || 'Unknown';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});

    // Group by position
    const positions = employeeData.reduce((acc, emp) => {
      const pos = emp.position || 'Unknown';
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {});

    // Recent joins (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentJoins = employeeData
      .filter(emp => emp.joiningDate && new Date(emp.joiningDate) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
      .slice(0, 5);

    setStats({
      totalEmployees,
      totalSalary,
      avgSalary,
      departments,
      positions,
      recentJoins
    });
  };

  const departmentData = Object.entries(stats.departments).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / stats.totalEmployees) * 100).toFixed(1)
  }));

  const salaryRangeData = employees.reduce((acc, emp) => {
    const salary = parseFloat(emp.salary) || 0;
    if (salary < 30000) acc['< $30K']++;
    else if (salary < 50000) acc['$30K - $50K']++;
    else if (salary < 70000) acc['$50K - $70K']++;
    else if (salary < 100000) acc['$70K - $100K']++;
    else acc['> $100K']++;
    return acc;
  }, { '< $30K': 0, '$30K - $50K': 0, '$50K - $70K': 0, '$70K - $100K': 0, '> $100K': 0 });

  const salaryChartData = Object.entries(salaryRangeData).map(([range, count]) => ({
    range,
    count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  if (loading) return <div className="text-center mt-5">Loading dashboard...</div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="dashboard-container">
      {/* Quick Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card stat-card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Total Employees</h6>
                  <h2 className="mb-0">{stats.totalEmployees}</h2>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card stat-card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Total Payroll</h6>
                  <h2 className="mb-0">${stats.totalSalary.toLocaleString()}</h2>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card stat-card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Average Salary</h6>
                  <h2 className="mb-0">${stats.avgSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card stat-card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Departments</h6>
                  <h2 className="mb-0">{Object.keys(stats.departments).length}</h2>
                </div>
                <div className="stat-icon">
                  <i className="fas fa-building"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <Link to="/employees/add" className="btn btn-primary btn-block w-100">
                    <i className="fas fa-plus me-2"></i>Add New Employee
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/employees" className="btn btn-outline-primary btn-block w-100">
                    <i className="fas fa-list me-2"></i>View All Employees
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/reports" className="btn btn-outline-info btn-block w-100">
                    <i className="fas fa-chart-bar me-2"></i>Generate Reports
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/settings" className="btn btn-outline-secondary btn-block w-100">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mb-4">
        {/* Department Distribution */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Department Distribution</h5>
            </div>
            <div className="card-body">
              {departmentData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({name, percentage}) => `${name}: ${percentage}%`}
                    >
                      {departmentData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-muted">No data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Salary Distribution */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Salary Distribution</h5>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Top Performers */}
      <div className="row">
        {/* Recent Joins */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Joins (Last 30 Days)</h5>
            </div>
            <div className="card-body">
              {stats.recentJoins.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentJoins.map((emp, index) => (
                    <div key={emp.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{emp.name}</h6>
                        <small className="text-muted">{emp.position} - {emp.department}</small>
                      </div>
                      <div className="text-end">
                        <small className="text-muted">
                          {new Date(emp.joiningDate).toLocaleDateString()}
                        </small>
                        <br />
                        <Link to={`/employees/view/${emp.id}`} className="btn btn-sm btn-outline-primary">
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted">No recent joins</div>
              )}
            </div>
          </div>
        </div>

        {/* Department Summary */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Department Summary</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th className="text-end">Employees</th>
                      <th className="text-end">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentData.map((dept, index) => (
                      <tr key={index}>
                        <td>
                          <span 
                            className="badge me-2" 
                            style={{backgroundColor: COLORS[index % COLORS.length]}}
                          >
                            &nbsp;
                          </span>
                          {dept.name}
                        </td>
                        <td className="text-end">{dept.value}</td>
                        <td className="text-end">{dept.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;