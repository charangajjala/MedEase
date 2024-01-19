package com.chapp.med_ease.cart.cart_dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartRequest {

    @NotNull(message = "User Id cannot be null")
    private Integer userId;

    @NotNull(message = "Medicine Id cannot be null")
    private Integer medicineId;

    @NotNull(message = "Quantity cannot be null")
    private Integer quantity;

    @NotNull(message = "Cost per month cannot be null")
    private Integer costPerMonth;

}
