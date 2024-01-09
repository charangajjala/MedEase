package com.chapp.med_ease.company;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByCompanyName(String companyName);

}
