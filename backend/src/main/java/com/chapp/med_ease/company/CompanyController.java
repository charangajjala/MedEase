package com.chapp.med_ease.company;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.company.CompanyDTO.CompanyRequest;
import com.chapp.med_ease.company.CompanyDTO.CompanyResponse;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<CompanyResponse> getCompanies() {
        final List<CompanyResponse> res = companyService.getCompanies();
        return res;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CompanyResponse getCompany(@PathVariable int id) throws NotFoundException {
        final CompanyResponse res = companyService.getCompany(id);
        return res;
    }

}
