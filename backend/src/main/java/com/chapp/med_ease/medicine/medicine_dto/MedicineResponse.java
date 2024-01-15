package com.chapp.med_ease.medicine.medicine_dto;

import com.chapp.med_ease.medicine.Medicine;

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

    public MedicineResponse(Medicine medicine) {
        this.id = medicine.getId();
        this.productTitle = medicine.getProductTitle();
        this.description = medicine.getDescription();
        this.productType = medicine.getMedicineType().getCategoryName();
        this.companyName = medicine.getCompany().getCompanyName();
        this.costPerMonth = medicine.getCostPerMonth();
        this.expiryDate = medicine.getExpiryDate();
        this.manufactureDate = medicine.getManufactureDate();
        this.productCode = medicine.getProductCode();
        this.totalStock = medicine.getTotalStock();
    }

}
