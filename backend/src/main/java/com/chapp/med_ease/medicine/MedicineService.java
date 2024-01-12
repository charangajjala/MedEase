package com.chapp.med_ease.medicine;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.company.Company;
import com.chapp.med_ease.company.CompanyRepository;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineRequest;
import com.chapp.med_ease.medicine_type.MedicineType;
import com.chapp.med_ease.medicine_type.MedicineTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;

    private final CompanyRepository companyRepository;

    private final MedicineTypeRepository medicineTypeRepository;

    public void createMedicine(MedicineRequest req) throws BadRequestException {

        final Optional<Medicine> medicine = medicineRepository.findByProductTitle(req.getProductTitle());

        if (medicine.isPresent()) {
            throw new BadRequestException("Medicine with product title " + req.getProductTitle() + " already exists");
        }

        final Company company = companyRepository.findByCompanyName(req.getCompanyName())
                .orElseThrow(() -> new BadRequestException("Company with name " + req.getCompanyName() + " not found"));

        final MedicineType medType = medicineTypeRepository.findByCategoryName(req.getProductType())
                .orElseThrow(() -> new BadRequestException("Medicine type " + req.getProductType() + " not found"));

        final Medicine newMedicine = Medicine.builder().productTitle(req.getProductTitle())
                .description(req.getDescription()).medicineType(medType).company(company)
                .costPerMonth(req.getCostPerMonth()).expiryDate(req.getExpiryDate()).totalStock(req.getTotalStock())
                .manufactureDate(req.getManufactureDate()).productCode(req.getProductCode()).build();

        medicineRepository.save(newMedicine);

    }
}
