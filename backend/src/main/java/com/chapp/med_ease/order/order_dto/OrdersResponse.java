package com.chapp.med_ease.order.order_dto;

import com.chapp.med_ease.order.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrdersResponse {

    private int id;

    private String orderDate;

    private int totalAmount;

    private String addressName;

    public OrdersResponse(Order order) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.totalAmount = order.getCart().getTotalCost();
        this.addressName = order.getAddress().getAddressName();

    }

}
