package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.NotFoundException;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest req) throws NotFoundException {
        System.out.println("AuthController");
        final LoginResponse res = authService.login(req);
        return ResponseEntity.ok(res);
    }

}
