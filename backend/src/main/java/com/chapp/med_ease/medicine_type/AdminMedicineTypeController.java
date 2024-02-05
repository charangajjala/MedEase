package com.chapp.med_ease.medicine_type;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeRequest;
import com.chapp.med_ease.medicine_type.medicine_type_dto.MedicineTypeResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin/medicine_type")
public class AdminMedicineTypeController {

    private final AdminMedicineTypeService medicineTypeService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public MedicineTypeResponse postMethodName(@RequestBody MedicineTypeRequest req) throws BadRequestException {

        MedicineTypeResponse res = medicineTypeService.createMedicineType(req);

        return res;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MedicineTypeResponse updateMedicineType(@PathVariable int id, @RequestBody MedicineTypeRequest req) throws BadRequestException, NotFoundException {
        MedicineTypeResponse res = medicineTypeService.updateMedicineType(id, req);
        return res;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<MedicineTypeResponse> getAllMedicineTypes() {
        List<MedicineTypeResponse> res = medicineTypeService.getAllMedicineTypes();
        return res;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MedicineTypeResponse getMedicineType(@PathVariable int id) throws NotFoundException {
        MedicineTypeResponse res = medicineTypeService.getMedicineType(id);
        return res;
    }

}
