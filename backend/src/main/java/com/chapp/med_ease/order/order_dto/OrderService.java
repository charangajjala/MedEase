package com.chapp.med_ease.order.order_dto;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.cart.Cart;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.order.Order;
import com.chapp.med_ease.order.OrderRespository;
import com.chapp.med_ease.user.Address;
import com.chapp.med_ease.user.User;
import com.chapp.med_ease.user.UserRepository;
import com.chapp.med_ease.util.UserFromToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UserFromToken userFromToken;
    private final UserRepository userRepository;
    private final OrderRespository orderRespository;

    public void createOrder(OrderRequest req) throws BadRequestException {

        final User user = userFromToken.get();

        final List<Address> addresses = user.getAddresses();

        final Cart cart = user.getCart();

        if (cart == null)
            throw new BadRequestException("Cart is empty");

        final Address address = addresses.stream().filter(a -> a.getId() == req.getAddressId()).findFirst()
                .orElseThrow(() -> new BadRequestException("Address not found"));

        final Order order = Order.builder().address(address).cart(cart).build();

        user.addOrder(order);

        userRepository.save(user);

        // orderRespository.save(order);

    }

}
