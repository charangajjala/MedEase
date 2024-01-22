package com.chapp.med_ease.user.address_dto;

import com.chapp.med_ease.user.Address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AddressResponse {

    private int id;
    private String addressName;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String country;
    private String pincode;

    public AddressResponse(Address address) {
        this.id = address.getId();
        this.addressName = address.getAddressName();
        this.addressLine1 = address.getAddressLine1();
        this.addressLine2 = address.getAddressLine2();
        this.city = address.getCity();
        this.state = address.getState();
        this.country = address.getCountry();
        this.pincode = address.getPincode();
    }

}
