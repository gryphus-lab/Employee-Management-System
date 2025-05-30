package com.ems.ems_backend.repository;

import com.ems.ems_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    boolean existsByEmail(String email);
    boolean existsByNameAndPhone(String name, String phone);

    /**
     * Find all employees whose name or email contains the given text (case-insensitive).
     *
     * @param nameFragment  Text to search for in the name
     * @param emailFragment Text to search for in the email
     * @return List of matching employees
     */
    List<Employee>
    findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase
    (String nameFragment,
     String emailFragment);
}
