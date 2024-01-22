package com.chapp.med_ease.user;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.user.user_dto.UserProfileResponse;
import com.chapp.med_ease.util.UserFromToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserFromToken userFromToken;

    public UserProfileResponse getUserProfile() throws BadRequestException {

        User user = userFromToken.get();

        UserProfileResponse res = new UserProfileResponse(user);

        return res;

    }

}
