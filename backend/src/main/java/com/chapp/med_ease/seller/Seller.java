package com.chapp.med_ease.seller;

import com.chapp.med_ease.medicine.Medicine;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="sellers")
public class Seller {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String phone;

  @ManyToMany
  @JoinTable(
          name= "seller_medicine",
          joinColumns = @JoinColumn(name = "seller_id"),
          inverseJoinColumns = @JoinColumn(name = "medicine_id")
  )
  private Set<Medicine> medicines;

  @Column()
  private String location;
}
