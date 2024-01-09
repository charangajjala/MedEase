package com.chapp.med_ease.company;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.company.CompanyDTO.CompanyRequest;
import com.chapp.med_ease.company.CompanyDTO.CompanyResponse;
import com.chapp.med_ease.exception.exceptions.BadRequestException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyResponse createCompany(CompanyRequest req) throws BadRequestException {

        final String companyName = req.getCompanyName();
        final String description = req.getDescription();

        Optional<Company> company = companyRepository.findByCompanyName(companyName);

        if (company.isPresent()) {
            throw new BadRequestException("Company already exists");
        }

        final Company newCompany = Company.builder()
                .companyName(companyName)
                .description(req.getDescription())
                .build();

        final Company savedCompany = companyRepository.save(newCompany);
        return CompanyResponse.builder()
                .id(savedCompany.getId())
                .companyName(companyName)
                .description(description)
                .build();
    }

}
