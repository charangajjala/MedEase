package com.chapp.med_ease.medicine;

import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineRequest;
import com.chapp.med_ease.medicine.medicine_dto.MedicineResponse;
import com.chapp.med_ease.medicine.medicine_dto.MedicinesResponse;
import com.chapp.med_ease.medicine.medicine_dto.UpdateMedicineRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/medicine")
public class AdminMedicineController {

    private final AdminMedicineService medicineService;

    @PostMapping(value = "", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createMedicine(
            @RequestParam("productTitle") @NotBlank(message = "Product title cannot be blank") String productTitle,
            @RequestParam("description") @NotBlank(message = "Description cannot be blank") String description,
            @RequestParam("productType") @NotBlank(message = "Product type cannot be blank") String productType,
            @RequestParam("companyName") @NotBlank(message = "Company name cannot be blank") String companyName,
            @RequestParam("costPerMonth") int costPerMonth,
            @RequestParam("expiryDate") String expiryDate,
            @RequestParam("manufactureDate") String manufactureDate,
            @RequestParam("productCode") String productCode,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("totalStock") int totalStock) {
        try {
            MedicineRequest req = MedicineRequest.builder()
                    .productTitle(productTitle)
                    .description(description)
                    .productType(productType)
                    .companyName(companyName)
                    .costPerMonth(costPerMonth)
                    .expiryDate(expiryDate)
                    .manufactureDate(manufactureDate)
                    .productCode(productCode)
                    .imageFile(imageFile)
                    .totalStock(totalStock)
                    .build();

            medicineService.createMedicine(req);
            return ResponseEntity.ok("Medicine created successfully");
        } catch (BadRequestException | IOException e) {
            return ResponseEntity.status(500).body("Error creating medicine: " + e.getMessage());
        }
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<MedicinesResponse> getMedicines() {

        List<MedicinesResponse> res = medicineService.getMedicines();

        return res;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MedicineResponse getMedicine(@PathVariable int id) throws BadRequestException {
        MedicineResponse res = medicineService.getMedicine(id);

        return res;
    }

    @PutMapping("medicine")
    @ResponseStatus(HttpStatus.OK)
    public void updateMedicine(@Valid @RequestBody UpdateMedicineRequest req) throws BadRequestException {
        medicineService.updateMedicine(req);

    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMedicine(@PathVariable int id) throws BadRequestException {
        medicineService.deleteMedicine(id);

    }

}
