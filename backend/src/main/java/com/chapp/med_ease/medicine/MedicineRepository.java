package com.chapp.med_ease.medicine;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {

    Optional<Medicine> findByProductTitle(String productTitle);

}
