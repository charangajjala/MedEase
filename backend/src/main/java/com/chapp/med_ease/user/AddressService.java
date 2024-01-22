package com.chapp.med_ease.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.user.address_dto.AddressRequest;
import com.chapp.med_ease.user.address_dto.AddressResponse;
import com.chapp.med_ease.util.UserFromToken;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    private final UserRepository userRepository;

    private final UserFromToken userFromToken;

    public void createAddress(AddressRequest req) throws BadRequestException {

        if (addressRepository.findByAddressName(req.getAddressName()).isPresent()) {
            throw new BadRequestException("Address name already exists");
        }

        Address address = Address.builder().addressName(req.getAddressName()).addressLine1(req.getAddressLine1())
                .addressLine2(req.getAddressLine2()).city(req.getCity()).state(req.getState()).country(req.getCountry())
                .pincode(req.getPincode()).build();

        final User user = userFromToken.get();

        user.addAddress(address);

        userRepository.save(user);

        // addressRepository.save(address);

    }

    public List<AddressResponse> getAddresses() throws BadRequestException {

        final User user = userFromToken.get();

        final List<Address> addresses = user.getAddresses();

        return addresses.stream().map(address -> new AddressResponse(address)).collect(Collectors.toList());
    }

    public AddressResponse getAddress(int addressId) throws BadRequestException, NotFoundException {

        final User user = userFromToken.get();

        final List<Address> addresses = user.getAddresses();

        final Address address = addresses.stream().filter(a -> a.getId() == addressId).findFirst()
                .orElseThrow(() -> new NotFoundException("Address not found"));

        return new AddressResponse(address);
    }

}
