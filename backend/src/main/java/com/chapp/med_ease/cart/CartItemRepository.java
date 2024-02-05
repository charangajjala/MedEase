package com.chapp.med_ease.cart;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chapp.med_ease.medicine.Medicine;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    Optional<CartItem> findByMedicine(Medicine medicine);

    Optional<CartItem> findByCartAndMedicine(Cart cart, Medicine medicine);

    Optional<CartItem> findByCartAndId(Cart cart, int id);

}
