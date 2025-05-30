package com.ems.ems_backend.service;

import com.ems.ems_backend.exception.DuplicateEmployeeException;
import com.ems.ems_backend.exception.EmployeeNotFoundException;
import com.ems.ems_backend.model.Employee;
import com.ems.ems_backend.repository.EmployeeRepository;
import com.ems.ems_backend.utils.EmployeeIdGenerator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeServiceImpl(EmployeeRepository repo) {
        this.repo = repo;
    }

    @Override
    public Employee create(Employee e) {
        // 1) Email must be unique
        if (repo.existsByEmail(e.getEmail())) {
            throw new DuplicateEmployeeException(
                    "Email '" + e.getEmail() + "' is already in use."
            );
        }
        // 2) If name+phone both match an existing record, reject
        if (repo.existsByNameAndPhone(e.getName(), e.getPhone())) {
            throw new DuplicateEmployeeException(
                    "An employee with name '" + e.getName() +
                            "' and phone '" + e.getPhone() + "' already exists."
            );
        }
        // 3) ID generation logic
        if (e.getId() == null || e.getId().isBlank()) {
            e.setId(EmployeeIdGenerator.generateId(e.getName(), e.getDepartment()));
        }
        return repo.save(e);
    }
    @Override
    public Employee update(String id, Employee e) {
        Employee existing = repo.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        existing.setName(e.getName());
        existing.setUsername(e.getUsername());
        existing.setEmail(e.getEmail());
        existing.setPhone(e.getPhone());
        existing.setPosition(e.getPosition());
        existing.setDepartment(e.getDepartment());
        existing.setSalary(e.getSalary());
        existing.setBonus(e.getBonus());
        existing.setAnnualVacationDays(e.getAnnualVacationDays());
        existing.setJoiningDate(e.getJoiningDate());
        existing.setLeavingDate(e.getLeavingDate());
        return repo.save(existing);
    }

    @Override
    public void delete(String id) {
        if (!repo.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        repo.deleteById(id);
    }

    @Override
    public Employee getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @Override
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Employee> search(String query) {
        return repo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
    }
}
