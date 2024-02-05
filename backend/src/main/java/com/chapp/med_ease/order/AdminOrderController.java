package com.chapp.med_ease.order;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.order.order_dto.AdminOrder;
import com.chapp.med_ease.order.order_dto.AdminOrders;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/admin/order")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<AdminOrders> getOrders() {
        List<AdminOrders> res = orderService.getAdminOrders();
        return res;
    }

    @GetMapping("/{id}")
    public AdminOrder getMethodName(@PathVariable int id) throws NotFoundException {
        AdminOrder res = orderService.getAdminOrder(id);
        return res;
    }

}
