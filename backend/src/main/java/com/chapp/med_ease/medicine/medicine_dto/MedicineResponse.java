package com.chapp.med_ease.medicine.medicine_dto;

import com.chapp.med_ease.medicine.Medicine;

import com.chapp.med_ease.seller.Seller;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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

    private String imageKey;

    private int totalStock;

    private Set<Integer> sellerIds;

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
        this.imageKey = medicine.getImageKey();
        this.totalStock = medicine.getTotalStock();
        Set<Seller> sellers = medicine.getSellers();
        for (Seller seller : sellers) {
            this.sellerIds.add(seller.getId());
        }
    }

}
