package com.chapp.med_ease.medicine;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineRequest;
import com.chapp.med_ease.medicine.medicine_dto.MedicineResponse;
import com.chapp.med_ease.medicine.medicine_dto.MedicinesResponse;
import com.chapp.med_ease.medicine.medicine_dto.UpdateMedicineRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/medicine")
public class AdminMedicineController {

    private final AdminMedicineService medicineService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createMedicine(@Valid @RequestBody MedicineRequest req) throws BadRequestException {
        medicineService.createMedicine(req);

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
