package com.chapp.med_ease.util;

import org.springframework.stereotype.Component;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.user.User;
import com.chapp.med_ease.user.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Component
@RequiredArgsConstructor
public class UserFromToken {

    private final UserRepository userRepository;

    public User get() throws BadRequestException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        final User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BadRequestException("User not found"));

        return user;

    }

}
