package com.chapp.med_ease.user.address_dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressRequest {

    @NotBlank(message = "Address name cannot be blank")
    private String addressName;

    @NotBlank(message = "Address line 1 cannot be blank")
    private String addressLine1;

    private String addressLine2;

    @NotBlank(message = "City cannot be blank")
    private String city;

    @NotBlank(message = "State cannot be blank")
    private String state;

    @NotBlank(message = "Country cannot be blank")
    private String country;

    @NotBlank(message = "Pincode cannot be blank")
    private String pincode;

}
