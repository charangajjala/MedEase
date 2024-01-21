package com.chapp.med_ease.cart.cart_dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponse {

    private int id;

    private CartProduct cartProduct;

    private int quantity;

    private int totalCost;

}
