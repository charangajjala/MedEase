package com.chapp.med_ease.seller.seller_dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerRequest {
  @NotBlank(message = "Name cannot be blank")
  private String name;

  @NotBlank(message = "Email cannot be blank")
  private String email;

  @NotBlank(message = "Phone cannot be blank")
  private String phone;

  private String location;
}
