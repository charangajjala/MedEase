package com.chapp.med_ease.user;

import com.chapp.med_ease.forgotPassword.forgotPasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.user.user_dto.UserProfileResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public UserProfileResponse getMethodName() throws BadRequestException {
        UserProfileResponse res = userService.getUserProfile();
        return res;
    }
}
