package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.NotFoundException;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/api/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest req) throws NotFoundException {
        logger.info("Login request received in AuthController");

        if (req == null) {
            logger.warn("Received null request in /login");
        } else {
            logger.info("Received login request for {}", req.getEmail());
        }

        try {
            final LoginResponse res = authService.login(req);
            logger.info("Login successful for {}", req.getEmail());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            logger.error("Error during login for {}: {}", req.getEmail(), e.getMessage());
            throw e;
        }
    }
}
