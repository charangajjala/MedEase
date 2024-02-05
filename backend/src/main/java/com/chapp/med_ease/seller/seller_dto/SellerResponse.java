package com.chapp.med_ease.seller.seller_dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SellerResponse {

  private int id;
  private String name;
  private String email;
  private String phone;
  private String location;
  private List<Integer> medicineIds;

}
