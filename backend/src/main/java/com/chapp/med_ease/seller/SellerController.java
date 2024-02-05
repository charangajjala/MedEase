package com.chapp.med_ease.seller;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.seller.seller_dto.SellerRequest;
import com.chapp.med_ease.seller.seller_dto.SellerResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<SellerResponse> getAllSellers() {
        return sellerService.getAllSellers();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public SellerResponse getSellerById(@PathVariable Integer id) {
        return sellerService.getSellerById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateSeller(@PathVariable Integer id, @Valid @RequestBody SellerRequest req) throws BadRequestException {
        sellerService.updateSeller(id, req);
    }

}
