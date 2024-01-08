package com.chapp.med_ease.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
class ErrorResponse {
    private String message;
}

@AllArgsConstructor
@Data
@Builder
class ValidationErrorResponse {

    private String field;
    private String message;

}