package com.chapp.med_ease.seller;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.seller.seller_dto.SellerRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createSeller(@Valid @RequestBody SellerRequest req) throws BadRequestException {
        sellerService.createSeller(req);
    }

}
