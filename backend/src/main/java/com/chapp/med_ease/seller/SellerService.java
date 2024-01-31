package com.chapp.med_ease.seller;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.Medicine;
import com.chapp.med_ease.medicine.MedicineRepository;
import com.chapp.med_ease.seller.seller_dto.SellerRequest;
import com.chapp.med_ease.seller.seller_dto.SellerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final MedicineRepository medicineRepository;

    public void createSeller(SellerRequest req) throws BadRequestException {
        if (sellerRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        Seller seller = new Seller();
        seller.setEmail(req.getEmail());
        seller.setName(req.getName());
        seller.setLocation(req.getLocation());
        seller.setPhone(req.getPhone());

        if (req.getMedicineIds() != null && !req.getMedicineIds().isEmpty()) {
            Set<Medicine> medicines = new HashSet<>();
            for (Integer medicineId : req.getMedicineIds()) {
                Medicine medicine = medicineRepository.findById(medicineId)
                        .orElseThrow(() -> new BadRequestException("Medicine with ID " + medicineId + " not found"));
                medicines.add(medicine);
            }
            seller.setMedicines(medicines);
        }


        sellerRepository.save(seller);
    }

    public List<SellerResponse> getAllSellers() {
        return sellerRepository.findAll().stream().map(seller -> SellerResponse.builder().id(seller.getId()).name(seller.getName()).email(seller.getEmail())
                .location(seller.getLocation()).phone(seller.getPhone()).build()).toList();
    }

    public SellerResponse getSellerById(Integer id) {
        Seller seller = sellerRepository.findById(id).orElseThrow();
        return SellerResponse.builder().id(seller.getId()).name(seller.getName()).email(seller.getEmail())
                .location(seller.getLocation()).phone(seller.getPhone()).build();
    }

    public void updateSeller(Integer id, SellerRequest req) {
        Seller seller = sellerRepository.findById(id).orElseThrow();
        seller.setEmail(req.getEmail());
        seller.setName(req.getName());
        seller.setLocation(req.getLocation());
        seller.setPhone(req.getPhone());

        sellerRepository.save(seller);
    }
}
