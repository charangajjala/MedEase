package com.chapp.med_ease.order;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.cart.Cart;
import com.chapp.med_ease.cart.CartItem;
import com.chapp.med_ease.cart.cart_dto.CartItemResponse;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotAuthorizedException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.order.order_dto.AdminOrder;
import com.chapp.med_ease.order.order_dto.AdminOrders;
import com.chapp.med_ease.order.order_dto.OrderRequest;
import com.chapp.med_ease.order.order_dto.OrderResponse;
import com.chapp.med_ease.order.order_dto.OrdersResponse;
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

    public OrderResponse getOrder(int id) throws BadRequestException, NotAuthorizedException {

        final User user = userFromToken.get();

        // final Order order = orderRespository.findById(id)
        // .orElseThrow(() -> new BadRequestException("Order not found"));

        final Order order = user.getOrders().stream().filter(o -> o.getId() == id).findFirst()
                .orElseThrow(() -> new NotAuthorizedException("Order does not belong to the user"));

        final Cart cart = order.getCart();

        List<CartItemResponse> cartItems = cart.getCartItems().stream()
                .map(cartItem -> new CartItemResponse(cartItem, cartItem.getMedicine())).toList();

        final OrderResponse orderResponse = new OrderResponse(order, cartItems);

        return orderResponse;

    }

    public List<OrdersResponse> getOrders() throws BadRequestException {

        final User user = userFromToken.get();

        final List<Order> orders = user.getOrders();

        final List<OrdersResponse> ordersResponse = orders.stream().map(order -> new OrdersResponse(order))
                .toList();

        return ordersResponse;

    }

    public List<AdminOrders> getAdminOrders() {

        final List<Order> orders = orderRespository.findAll();

        final List<AdminOrders> adminOrders = orders.stream()
                .map(order -> new AdminOrders(order, order.getUser().getUserName())).toList();

        return adminOrders;

    }

    public AdminOrder getAdminOrder(int id) throws NotFoundException {

        final Order order = orderRespository.findById(id).orElseThrow(() -> new NotFoundException("Order not found"));

        final Cart cart = order.getCart();

        List<CartItemResponse> cartItems = cart.getCartItems().stream()
                .map(cartItem -> new CartItemResponse(cartItem, cartItem.getMedicine())).toList();

        final AdminOrder adminOrder = new AdminOrder(order, cartItems);

        return adminOrder;

    }

}
