package com.chapp.med_ease.order.order_dto;

import com.chapp.med_ease.order.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AdminOrders {

    private int id;

    private String orderDate;

    private int totalAmount;

    private String username;

    public AdminOrders(Order order, String username) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.totalAmount = order.getCart().getTotalCost();
        this.username = username;
    }

}
