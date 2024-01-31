package com.chapp.med_ease.seller;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Integer>{
    Optional<Seller> findByEmail(String email);
}
