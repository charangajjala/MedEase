package com.chapp.med_ease.medicine_type.medicine_type_dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicineTypeResponse {

    private int id;
    private String categoryName;
    private String description;

}
