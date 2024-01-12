package com.chapp.med_ease.medicine.medicine_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicinesResponse {

    private int id;

    private String name;

    private String category;

    private int cost;

}
