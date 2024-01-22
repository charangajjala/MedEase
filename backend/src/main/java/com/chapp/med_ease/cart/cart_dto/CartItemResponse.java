package com.chapp.med_ease.cart.cart_dto;

import com.chapp.med_ease.cart.Cart;
import com.chapp.med_ease.cart.CartItem;
import com.chapp.med_ease.medicine.Medicine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

    private int id;

    private CartProduct cartProduct;

    private int quantity;

    private int totalCost;

    public CartItemResponse(CartItem cartItem, Medicine medicine) {
        this.id = cartItem.getId();
        this.cartProduct = new CartProduct(medicine);
        this.quantity = cartItem.getQuantity();
        this.totalCost = cartItem.getTotalCost();
    }

}
