package com.chapp.med_ease.cart.cart_dto;

import com.chapp.med_ease.medicine.Medicine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CartProduct {
    private int id;
    private String productTitle;
    private int costPerMonth;
    private int totalStock;

    public CartProduct(Medicine medicine) {
        this.id = medicine.getId();
        this.productTitle = medicine.getProductTitle();
        this.costPerMonth = medicine.getCostPerMonth();
        this.totalStock = medicine.getTotalStock();
    }
}
