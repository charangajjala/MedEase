package com.chapp.med_ease.company;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.company.CompanyDTO.CompanyRequest;
import com.chapp.med_ease.company.CompanyDTO.CompanyResponse;
import com.chapp.med_ease.company.CompanyDTO.UpdateCompanyRequest;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;

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

    public List<CompanyResponse> getCompanies() {
        return companyRepository.findAll().stream()
                .map(company -> CompanyResponse.builder()
                        .id(company.getId())
                        .companyName(company.getCompanyName())
                        .description(company.getDescription())
                        .build())
                .toList();
    }

    public CompanyResponse getCompany(int id) throws NotFoundException {
        Company company = companyRepository.findById(id).orElseThrow(() -> new NotFoundException("Company not found"));
        return CompanyResponse.builder()
                .id(company.getId())
                .companyName(company.getCompanyName())
                .description(company.getDescription())
                .build();
    }

    public CompanyResponse updateCompany(UpdateCompanyRequest req) throws NotFoundException {
        Company company = companyRepository.findById(req.getId())
                .orElseThrow(() -> new NotFoundException("Company not found"));

        Company updatedCompany = Company.builder()
                .id(req.getId())
                .companyName(req.getCompanyName())
                .description(req.getDescription())
                .build();

        companyRepository.save(updatedCompany);

        return CompanyResponse.builder()
                .id(company.getId())
                .companyName(company.getCompanyName())
                .description(company.getDescription())
                .build();
    }

}
