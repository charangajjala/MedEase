package com.chapp.med_ease.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRespository extends JpaRepository<Cart, Integer> {

}
