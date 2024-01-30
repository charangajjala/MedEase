package com.chapp.med_ease.medicine;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.chapp.med_ease.aws.AWSService;
import org.springframework.stereotype.Service;

import com.chapp.med_ease.company.Company;
import com.chapp.med_ease.company.CompanyRepository;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineRequest;
import com.chapp.med_ease.medicine.medicine_dto.MedicineResponse;
import com.chapp.med_ease.medicine.medicine_dto.MedicinesResponse;
import com.chapp.med_ease.medicine.medicine_dto.UpdateMedicineRequest;
import com.chapp.med_ease.medicine_type.MedicineType;
import com.chapp.med_ease.medicine_type.MedicineTypeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminMedicineService {

    private final MedicineRepository medicineRepository;

    private final CompanyRepository companyRepository;

    private final MedicineTypeRepository medicineTypeRepository;

    private final AWSService awsService;

    public void createMedicine(MedicineRequest req) throws BadRequestException, IOException {
        final Optional<Medicine> existingMedicine = medicineRepository.findByProductTitle(req.getProductTitle());
        if (existingMedicine.isPresent()) {
            throw new BadRequestException("Medicine with product title " + req.getProductTitle() + " already exists");
        }

        String keyName = UUID.randomUUID().toString();

        try {
            awsService.uploadObject("medeaseportal-bucket", keyName, req.getImageFile());
        } catch (Exception e) {
            throw new BadRequestException("Error uploading image: " + e.getMessage());
        }

        final Company company = companyRepository.findByCompanyName(req.getCompanyName())
                .orElseThrow(() -> new BadRequestException("Company with name " + req.getCompanyName() + " not found"));

        final MedicineType medType = medicineTypeRepository.findByCategoryName(req.getProductType())
                .orElseThrow(() -> new BadRequestException("Medicine type " + req.getProductType() + " not found"));

        final Medicine newMedicine = Medicine.builder()
                .productTitle(req.getProductTitle())
                .description(req.getDescription())
                .medicineType(medType)
                .company(company)
                .costPerMonth(req.getCostPerMonth())
                .expiryDate(req.getExpiryDate())
                .totalStock(req.getTotalStock())
                .manufactureDate(req.getManufactureDate())
                .productCode(req.getProductCode())
                .imageKey(keyName)
                .build();

        medicineRepository.save(newMedicine);
    }


    public List<MedicinesResponse> getMedicines() {

        return medicineRepository.findAll().stream().map(medicine -> {
            return MedicinesResponse.builder().name(medicine.getProductTitle()).id(medicine.getId())
                    .category(medicine.getMedicineType().getCategoryName())
                    .cost(medicine.getCostPerMonth()).build();
        }).toList();

    }

    public MedicineResponse getMedicine(int id) throws BadRequestException {

        final Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Medicine with id " + id + " not found"));

        final String companyName = medicine.getCompany().getCompanyName();
        final String productType = medicine.getMedicineType().getCategoryName();

        return MedicineResponse.builder().id(medicine.getId()).productTitle(medicine.getProductTitle())
                .description(medicine.getDescription()).productType(productType).companyName(companyName)
                .costPerMonth(medicine.getCostPerMonth()).expiryDate(medicine.getExpiryDate())
                .manufactureDate(medicine.getManufactureDate()).productCode(medicine.getProductCode())
                .totalStock(medicine.getTotalStock()).build();

    }

    public void updateMedicine(UpdateMedicineRequest req) throws BadRequestException {

        final Medicine oldMedicine = medicineRepository.findById(req.getId())
                .orElseThrow(() -> new BadRequestException(
                        "Medicine with product title " + req.getProductTitle() + " not found"));

        if (req.getCompanyName() != oldMedicine.getCompany().getCompanyName()) {
            final Company company = companyRepository.findByCompanyName(req.getCompanyName())
                    .orElseThrow(
                            () -> new BadRequestException("Company with name " + req.getCompanyName() + " not found"));
            oldMedicine.setCompany(company);
        }

        if (req.getProductType() != oldMedicine.getMedicineType().getCategoryName()) {
            final MedicineType medType = medicineTypeRepository.findByCategoryName(req.getProductType())
                    .orElseThrow(() -> new BadRequestException("Medicine type " + req.getProductType() + " not found"));
            oldMedicine.setMedicineType(medType);
        }

        oldMedicine.setProductTitle(req.getProductTitle());
        oldMedicine.setDescription(req.getDescription());
        oldMedicine.setCostPerMonth(req.getCostPerMonth());
        oldMedicine.setExpiryDate(req.getExpiryDate());
        oldMedicine.setManufactureDate(req.getManufactureDate());
        oldMedicine.setProductCode(req.getProductCode());
        oldMedicine.setTotalStock(req.getTotalStock());

        medicineRepository.save(oldMedicine);

    }

    public void deleteMedicine(int id) throws BadRequestException {

        medicineRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Medicine with id " + id + " not found"));

        medicineRepository.deleteById(id);

    }
}
