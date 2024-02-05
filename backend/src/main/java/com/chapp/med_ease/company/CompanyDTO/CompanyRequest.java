package com.chapp.med_ease.company.CompanyDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyRequest {

    @NotBlank(message = "Company Name is Required")
    private String companyName;

    @NotBlank(message = "Description is Required")
    private String description;
}
