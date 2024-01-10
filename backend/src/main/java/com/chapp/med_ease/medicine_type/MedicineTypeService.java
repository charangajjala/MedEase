package com.chapp.med_ease.medicine_type;

import java.util.List;
import java.util.Optional;

import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Service;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeRequest;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MedicineTypeService {

    private final MedicineTypeRepository medicineTypeRepository;

    public MedicineTypeResponse createMedicineType(MedicineTypeRequest req) throws BadRequestException {

        final String categoryName = req.getCategoryName();
        final String description = req.getDescription();

        Optional<MedicineType> medicineType = medicineTypeRepository.findByCategoryName(categoryName);

        if (medicineType.isPresent()) {
            throw new BadRequestException("Medicine Type already exists");
        }

        MedicineType newMedicineType = MedicineType.builder().categoryName(categoryName)
                .description(description).build();

        MedicineType savedMedicineType = medicineTypeRepository.save(newMedicineType);

        MedicineTypeResponse res = MedicineTypeResponse.builder().id(savedMedicineType.getId())
                .categoryName(categoryName).description(description).build();

        return res;
    }

    public List<MedicineTypeResponse> getAllMedicineTypes() {

        return medicineTypeRepository.findAll().stream()
                .map(medicineType -> MedicineTypeResponse.builder().id(medicineType.getId())
                        .categoryName(medicineType.getCategoryName()).description(medicineType.getDescription())
                        .build())
                .toList();

    }

    public MedicineTypeResponse getMedicineType(int id) throws NotFoundException {

        MedicineType medicineType = medicineTypeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Medicine Type not found"));

        return MedicineTypeResponse.builder().id(medicineType.getId())
                .categoryName(medicineType.getCategoryName()).description(medicineType.getDescription()).build();

    }

}
