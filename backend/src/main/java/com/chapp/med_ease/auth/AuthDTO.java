package com.chapp.med_ease.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
class LoginRequest {

    private String email;
    private String password;
}

@Data
@Builder
class LoginResponse {
    private String accessToken;
    private String refreshToken;
}