package com.chapp.med_ease.company.CompanyDTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyResponse {

    private int id;
    private String companyName;
    private String description;

}
