import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

class EmployeeService {
  getAllEmployees() {
    return axios.get(API_URL);
  }

  createEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  getEmployeeById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateEmployee(id, employee) {
    return axios.put(`${API_URL}/${id}`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  searchEmployees(query) {
    return axios.get(`${API_URL}/search?query=${encodeURIComponent(query)}`);
  }
}

const employeeService = new EmployeeService();
export default employeeService;