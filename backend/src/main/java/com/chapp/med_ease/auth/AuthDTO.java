package com.chapp.med_ease.auth;

import com.chapp.med_ease.user.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
class LoginRequest {

    @NotBlank(message = "Email is Required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is Required")
    private String password;
}

@Data
@Builder
class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private Role role;
}

@Data
@Builder
class RegisterRequest {
    @NotBlank(message = "Email is Required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is Required")
    private String password;

    @NotBlank(message = "UserName is Required")
    private String username;

}

@Data
@Builder
class RefreshRequest {
    @NotBlank(message = "Refresh Token is Required")
    private String refreshToken;
}