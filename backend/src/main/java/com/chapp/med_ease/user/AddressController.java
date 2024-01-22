
package com.chapp.med_ease.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.user.address_dto.AddressRequest;
import com.chapp.med_ease.user.address_dto.AddressResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void postAddress(@RequestBody AddressRequest req) throws BadRequestException {
        addressService.createAddress(req);

    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<AddressResponse> getAddresses() throws BadRequestException {
        List<AddressResponse> addresses = addressService.getAddresses();
        return addresses;
    }

    @GetMapping("/{addressId}")
    @ResponseStatus(HttpStatus.OK)
    public AddressResponse getMethodName(@PathVariable int addressId) throws BadRequestException, NotFoundException {
        AddressResponse res = addressService.getAddress(addressId);
        return res;
    }

}