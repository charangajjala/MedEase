package com.chapp.med_ease.medicine;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.medicine_dto.MedicineResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/medicine")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<MedicineResponse> getMethodName(@RequestParam(defaultValue = "All Categories") String categoryName,
            @RequestParam(defaultValue = "") String keyword) throws BadRequestException {
        List<MedicineResponse> res = medicineService.getMedicines(categoryName, keyword);
        return res;
    }

}
