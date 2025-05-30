// src/main/java/com/ems/ems_backend/controller/EmployeeController.java
package com.ems.ems_backend.controller;

import com.ems.ems_backend.model.Employee;
import com.ems.ems_backend.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PostMapping
    public Employee create(@RequestBody Employee newEmployee) {
        return service.create(newEmployee);
    }

    @GetMapping
    public List<Employee> list() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Employee get(@PathVariable String id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable String id,
                           @RequestBody Employee updated) {
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @GetMapping("/search")
    public List<Employee> search(@RequestParam String query) {
        return service.search(query);
    }
}
