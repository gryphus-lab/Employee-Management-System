package com.ems.ems_backend.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,Object>> handleAny(Exception ex) {
        ex.printStackTrace();
        Map<String,Object> body = new LinkedHashMap<>();
        body.put("error", ex.getClass().getSimpleName());
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(DuplicateEmployeeException.class)
    public ResponseEntity<Map<String,String>> onDuplicate(DuplicateEmployeeException ex) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("error", ex.getMessage()));
    }
}