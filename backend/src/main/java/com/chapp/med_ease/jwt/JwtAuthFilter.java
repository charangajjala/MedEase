package com.chapp.med_ease.jwt;

import java.io.IOException;

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

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
            FilterChain filterChain)
            throws ServletException, IOException {

        if (req.getServletPath().contains("/api/login")) {
            filterChain.doFilter(req, res);
            return;
        }

        // System.out.println("JwtAuthFilter");

        final String authorizationHeader = req.getHeader("Authorization");

        // System.out.println(authorizationHeader);

        if (authorizationHeader == null || authorizationHeader.isEmpty()
                || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(req, res);
            return;
        }

        final String jwtToken = authorizationHeader.substring(7);

        final String userEmail = jwtService.extractUsername(jwtToken);

        if (userEmail == null || userEmail.isEmpty()) {
            filterChain.doFilter(req, res);
            return;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        if (jwtService.isTokenValid(jwtToken, userDetails)
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            final UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(req));
            SecurityContextHolder.getContext().setAuthentication(authToken);

        }

        filterChain.doFilter(req, res);

    }

}
