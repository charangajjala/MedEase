package com.chapp.med_ease.order;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chapp.med_ease.cart.Cart;

public interface OrderRespository extends JpaRepository<Order, Integer> {

    Optional<Order> findByCart(Cart cart);

}
