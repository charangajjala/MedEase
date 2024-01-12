package com.chapp.med_ease.medicine.medicine_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicineResponse {

    private int id;

    private String productTitle;

    private String description;

    private String productType;

    private String companyName;

    private int costPerMonth;

    private String expiryDate;

    private String manufactureDate;

    private String productCode;

    private int totalStock;

}
