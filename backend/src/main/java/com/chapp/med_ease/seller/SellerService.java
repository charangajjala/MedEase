package com.chapp.med_ease.seller;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.seller.seller_dto.SellerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;

    public void createSeller(SellerRequest req) throws BadRequestException {
        if (sellerRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        Seller seller = new Seller();
        seller.setEmail(req.getEmail());
        seller.setName(req.getName());
        seller.setLocation(req.getLocation());
        seller.setPhone(req.getPhone());

        sellerRepository.save(seller);
    }
}
