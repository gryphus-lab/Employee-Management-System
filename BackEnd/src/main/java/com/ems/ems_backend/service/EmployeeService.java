package com.ems.ems_backend.service;

import com.ems.ems_backend.model.Employee;

import java.util.List;
public interface EmployeeService {
    Employee create(Employee e);
    Employee update(String id, Employee e);
    void delete(String id);
    Employee getById(String id);
    List<Employee> getAll();
    List<Employee> search(String query);
}
