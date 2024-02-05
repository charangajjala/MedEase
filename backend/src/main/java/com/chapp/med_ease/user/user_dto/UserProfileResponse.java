package com.chapp.med_ease.user.user_dto;

import com.chapp.med_ease.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserProfileResponse {

    private int id;

    private String username;

    private String email;

    public UserProfileResponse(User user) {
        this.id = user.getId();
        this.username = user.getUserName();
        this.email = user.getEmail();
    }

}
