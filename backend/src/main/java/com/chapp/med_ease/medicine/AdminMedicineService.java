package com.chapp.med_ease.medicine;

import java.io.IOException;
import java.util.*;
import java.util.logging.Logger;

import com.chapp.med_ease.aws.AWSService;
import com.chapp.med_ease.seller.Seller;
import com.chapp.med_ease.seller.SellerRepository;
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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminMedicineService {

    private final MedicineRepository medicineRepository;

    private final CompanyRepository companyRepository;

    private final MedicineTypeRepository medicineTypeRepository;

    private final SellerRepository sellerRepository;

    private final AWSService awsService;

    private final Logger logger = Logger.getLogger(AdminMedicineService.class.getName());

    @Transactional
    public void createMedicine(MedicineRequest req) throws BadRequestException, IOException {
        logger.info("Creating new medicine with title: " + req.getProductTitle());

        Optional<Medicine> existingMedicine = medicineRepository.findByProductTitle(req.getProductTitle());
        if (existingMedicine.isPresent()) {
            logger.warning("Medicine with product title " + req.getProductTitle() + " already exists");
            throw new BadRequestException("Medicine with product title " + req.getProductTitle() + " already exists");
        }

        String keyName = UUID.randomUUID().toString();
        try {
            logger.info("Uploading image to AWS S3 with key name: " + keyName);
            awsService.uploadObject("medeaseportal-bucket", keyName, req.getImageFile());
        } catch (Exception e) {
            logger.severe("Error uploading image: " + e.getMessage());
            throw new BadRequestException("Error uploading image: " + e.getMessage());
        }

        Company company = companyRepository.findByCompanyName(req.getCompanyName())
                .orElseThrow(() -> new BadRequestException("Company with name " + req.getCompanyName() + " not found"));

        MedicineType medType = medicineTypeRepository.findByCategoryName(req.getProductType())
                .orElseThrow(() -> new BadRequestException("Medicine type " + req.getProductType() + " not found"));

        Medicine newMedicine = Medicine.builder()
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
        logger.info("Saved new medicine to the database");

//        if (req.getSellerIds() != null && !req.getSellerIds().isEmpty()) {
//            logger.info("Assigning sellers to the new medicine"+ req.getSellerIds());
//            Set<Seller> sellers = new HashSet<>();
//            for (Integer sellerId : req.getSellerIds()) {
//                Seller seller = sellerRepository.findById(sellerId)
//                        .orElseThrow(() -> new BadRequestException("Seller with ID " + sellerId + " not found"));
//                logger.info("Found seller with ID " + sellerId + seller);
//                sellers.add(seller);
//
//                logger.info("Adding"+ seller + " to " + seller.getMedicines());
//                seller.getMedicines().add(newMedicine);
//
//                logger.info("Added medicine to the seller");
//                sellerRepository.save(seller);
//
//                logger.info("Saved seller");
//            }
//            newMedicine.setSellers(sellers);
//            logger.info("Assigned sellers to the new medicine");
//        }
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
        final String imageKey = medicine.getImageKey();

        return MedicineResponse.builder().id(medicine.getId()).productTitle(medicine.getProductTitle())
                .description(medicine.getDescription()).productType(productType).companyName(companyName)
                .costPerMonth(medicine.getCostPerMonth()).expiryDate(medicine.getExpiryDate())
                .manufactureDate(medicine.getManufactureDate()).productCode(medicine.getProductCode())
                .totalStock(medicine.getTotalStock()).imageKey(imageKey).build();

    }

    @Transactional
    public void updateMedicine(UpdateMedicineRequest req) throws BadRequestException {

        final Medicine oldMedicine = medicineRepository.findById(req.getId())
                .orElseThrow(() -> new BadRequestException(
                        "Medicine with product title " + req.getProductTitle() + " not found"));

        if (req.getImageFile() != null) {
            String keyName = UUID.randomUUID().toString();

            try {
                awsService.uploadObject("medeaseportal-bucket", keyName, req.getImageFile());
            } catch (Exception e) {
                throw new BadRequestException("Error uploading image: " + e.getMessage());
            }

            oldMedicine.setImageKey(keyName);
        }

        if (!Objects.equals(req.getCompanyName(), oldMedicine.getCompany().getCompanyName())) {
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
//        updateSellers(oldMedicine, req.getSellerIds());

        medicineRepository.save(oldMedicine);

    }

//    private void updateSellers(Medicine oldMedicine, Set<Integer> sellerIds) throws BadRequestException {
////        Set<Seller> currentSellers = oldMedicine.getSellers();
//        currentSellers.removeIf(seller -> !sellerIds.contains(seller.getId()));
//        for (Integer sellerId : sellerIds) {
//            if (currentSellers.stream().noneMatch(seller -> seller.getId() == sellerId)) {
//                final Seller seller = sellerRepository.findById(sellerId)
//                        .orElseThrow(() -> new BadRequestException("Seller with id " + sellerId + " not found"));
//                currentSellers.add(seller);
//            }
//        }
//        oldMedicine.setSellers(currentSellers);
//    }

    public void deleteMedicine(int id) throws BadRequestException {

        medicineRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Medicine with id " + id + " not found"));

        try {
            awsService.deleteObject("medeaseportal-bucket", medicineRepository.findById(id).get().getImageKey());
        } catch (Exception e) {
            throw new BadRequestException("Error deleting image: " + e.getMessage());
        }

        medicineRepository.deleteById(id);

    }
}
