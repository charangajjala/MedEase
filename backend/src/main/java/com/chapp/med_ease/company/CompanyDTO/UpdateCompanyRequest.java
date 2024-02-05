package com.chapp.med_ease.company.CompanyDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateCompanyRequest {

    @NotBlank(message = "Id is mandatory")
    private int id;
    @NotBlank(message = "Company name is mandatory")

    private String companyName;
    @NotBlank(message = "Description is mandatory")
    private String description;

}
