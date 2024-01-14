package com.chapp.med_ease.medicine.medicine_dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateMedicineRequest {

    @NotNull(message = "Id cannot be blank")
    private int id;

    @NotBlank(message = "Product title cannot be blank")
    private String productTitle;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Product type cannot be blank")
    private String productType;

    @NotBlank(message = "Company name cannot be blank")
    private String companyName;

    private int costPerMonth;

    private String expiryDate;

    private String manufactureDate;

    private String productCode;

    private int totalStock;

}
