package com.chapp.med_ease.medicine_type;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeRequest;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@RestController
@RequestMapping("/medicine_type")
public class MedicineTypeController {

    private final MedicineTypeService medicineTypeService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public MedicineTypeResponse postMethodName(@RequestBody MedicineTypeRequest req) throws BadRequestException {

        MedicineTypeResponse res = medicineTypeService.createMedicineType(req);

        return res;
    }

}
