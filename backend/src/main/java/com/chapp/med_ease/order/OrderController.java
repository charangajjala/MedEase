package com.chapp.med_ease.order;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotAuthorizedException;
import com.chapp.med_ease.order.order_dto.OrderRequest;
import com.chapp.med_ease.order.order_dto.OrderResponse;
import com.chapp.med_ease.order.order_dto.OrdersResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void postOrder(@RequestBody OrderRequest req) throws BadRequestException {

        orderService.createOrder(req);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse getOrder(@PathVariable int id) throws BadRequestException, NotAuthorizedException {
        OrderResponse res = orderService.getOrder(id);
        return res;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<OrdersResponse> getOrders() throws BadRequestException {
        List<OrdersResponse> res = orderService.getOrders();
        return res;
    }

}
