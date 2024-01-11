package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.jwt.JwtService;
import com.chapp.med_ease.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepo;

    public LoginResponse login(LoginRequest req) throws NotFoundException {
        logger.info("Attempting login for user: {}", req.getEmail());

        final UserDetails userDetails = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found: " + req.getEmail()));

        final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword());

        try {
            authManager.authenticate(authToken);
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", req.getEmail(), e);
            throw e;
        }

        final String accessToken = jwtService.generateToken(userDetails);
        final String refreshToken = jwtService.generateRefreshToken(userDetails);

        logger.info("Login successful for user: {}", req.getEmail());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

}
