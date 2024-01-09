package com.chapp.med_ease.company;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.company.CompanyDTO.CompanyRequest;
import com.chapp.med_ease.company.CompanyDTO.CompanyResponse;
import com.chapp.med_ease.exception.exceptions.BadRequestException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CompanyResponse postCompany(@Valid @RequestBody CompanyRequest req) throws BadRequestException {
        final CompanyResponse res = companyService.createCompany(req);
        return res;
    }

}
