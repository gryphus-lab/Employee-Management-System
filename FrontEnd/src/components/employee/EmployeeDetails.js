import { useState, useEffect } from 'react';

const EmployeeDetails = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details from backend
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`/employees/${employeeId}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...employee, position: 'Updated Position' }),
      });
      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployee(updatedEmployee);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/employees/${employeeId}`, { method: 'DELETE' });
      setEmployee(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (!employee) return <div>Loading employee details...</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeDetails;
