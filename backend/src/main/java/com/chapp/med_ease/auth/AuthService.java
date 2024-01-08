package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.jwt.JwtService;
import com.chapp.med_ease.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepo;

    public LoginResponse login(LoginRequest req) throws NotFoundException {

        final String email = req.getEmail();
        final String password = req.getPassword();

        // System.out.println(email + " " + password);

        final UserDetails userDetails = userRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

        authManager.authenticate(authToken);


        final String accessToken = jwtService.generateToken(userDetails);
        final String refreshToken = jwtService.generateRefreshToken(userDetails);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

    }

}
