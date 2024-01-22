package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotAuthenticatedException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.jwt.JwtService;
import com.chapp.med_ease.user.Role;
import com.chapp.med_ease.user.User;
import com.chapp.med_ease.user.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest req) throws NotFoundException {
        logger.info("Attempting login for user: {}", req.getEmail());

        final UserDetails userDetails = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found: " + req.getEmail()));

        final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(req.getEmail(),
                req.getPassword());

        try {
            authManager.authenticate(authToken);
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", req.getEmail(), e);
            throw e;
        }

        final String accessToken = jwtService.generateToken(userDetails);
        final String refreshToken = jwtService.generateRefreshToken(userDetails);
        final User user = (User) userDetails;
        final Role role = user.getRole();

        logger.info("Login successful for user: {}", req.getEmail());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .role(role)
                .build();
    }

    public void register(RegisterRequest req) throws BadRequestException {

        final String email = req.getEmail();
        final String password = req.getPassword();

        final Optional<User> user = userRepo.findByEmail(email);

        if (user.isPresent()) {
            throw new BadRequestException("User already exists with email: " + email);
        }

        final String encryptedPassword = passwordEncoder.encode(password);

        final User newUser = User.builder()
                .email(email)
                .password(encryptedPassword)
                .username(req.getUsername())
                .role(Role.USER)
                .build();

        userRepo.save(newUser);

    }

    public LoginResponse refresh(RefreshRequest req) throws BadRequestException, NotAuthenticatedException {

        final String refreshToken = req.getRefreshToken();

        final String email = jwtService.extractUsername(refreshToken);

        final UserDetails userDetails = userRepo.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Token is invalid"));

        if (jwtService.isTokenExpired(refreshToken)) {
            throw new NotAuthenticatedException("Token is expired");
        }

        else {
            final String accessToken = jwtService.generateToken(userDetails);
            final User user = (User) userDetails;
            final Role role = user.getRole();

            return LoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .role(role)
                    .build();
        }

    }

}
