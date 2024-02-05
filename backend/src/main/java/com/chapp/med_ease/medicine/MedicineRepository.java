package com.chapp.med_ease.medicine;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chapp.med_ease.medicine_type.MedicineType;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {

    Optional<Medicine> findByProductTitle(String productTitle);

    List<Medicine> findByMedicineTypeAndProductTitleContaining(MedicineType medicineType, String keyword);

    List<Medicine> findByProductTitleContaining(String keyword);

}
