package com.chapp.med_ease.medicine;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineResponse;
import com.chapp.med_ease.medicine_type.MedicineType;
import com.chapp.med_ease.medicine_type.MedicineTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineTypeRepository medicineTypeRepository;
    private final MedicineRepository medicineRepository;

    public List<MedicineResponse> getMedicines(String categoryName, String keyword) throws BadRequestException {

        if (!categoryName.equals("All Categories")) {

            final MedicineType medicineType = medicineTypeRepository.findByCategoryName(categoryName)
                    .orElseThrow(() -> {
                        return new BadRequestException("Medicine type " + categoryName + " not found");
                    });

            final List<Medicine> medicines = medicineRepository.findByMedicineTypeAndProductTitleContaining(
                    medicineType,
                    keyword);

            return medicines.stream().map(medicine -> new MedicineResponse(medicine)).toList();

        }

        final List<Medicine> allMedicines = medicineRepository.findByProductTitleContaining(keyword);
        return allMedicines.stream().map(medicine -> new MedicineResponse(medicine)).toList();

    }

}
