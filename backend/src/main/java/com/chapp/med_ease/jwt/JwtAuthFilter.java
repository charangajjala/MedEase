package com.chapp.med_ease.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws ServletException, IOException {

        logger.info("Processing authentication for '{}'", req.getRequestURL());
        final String authorizationHeader = req.getHeader("Authorization");
        logger.info("Authorization header: {}", authorizationHeader);

        if (req.getRequestURI().contains("/api/login")) {
            filterChain.doFilter(req, res);
            logger.info("Authentication skipped for login request {}",req.getRequestURI());
            return;
        }


        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            logger.info("No valid Authorization header found");
            filterChain.doFilter(req, res);
            return;
        }

        final String jwtToken = authorizationHeader.substring(7);

        final String userEmail = jwtService.extractUsername(jwtToken);

        if (userEmail == null || userEmail.isEmpty()) {
            logger.info("JWT token does not contain a valid username");
            filterChain.doFilter(req, res);
            return;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        if (jwtService.isTokenValid(jwtToken, userDetails)
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            logger.info("JWT token is valid, setting security context for user '{}'", userEmail);
            final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } else {
            logger.info("JWT token is invalid or user is already authenticated");
        }

        filterChain.doFilter(req, res);
    }
}
