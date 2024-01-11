package com.chapp.med_ease.medicine_type;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineTypeRepository extends JpaRepository<MedicineType, Integer> {
    Optional<MedicineType> findByCategoryName(String categoryName);

}
