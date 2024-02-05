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
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final MedicineRepository medicineRepository;

    private final Logger logger = Logger.getLogger(SellerService.class.getName());

    public void createSeller(SellerRequest req) throws BadRequestException {
        logger.info("Attempting to create a new seller with email: " + req.getEmail());

        if (sellerRepository.findByEmail(req.getEmail()).isPresent()) {
            logger.warning("Creation failed: Email " + req.getEmail() + " already exists.");
            throw new BadRequestException("Email already exists");
        }

        Seller seller = new Seller();
        seller.setEmail(req.getEmail());
        seller.setName(req.getName());
        seller.setLocation(req.getLocation());
        seller.setPhone(req.getPhone());

//        if (req.getMedicineIds() != null && !req.getMedicineIds().isEmpty()) {
//            Set<Medicine> medicines = new HashSet<>();
//            for (Integer medicineId : req.getMedicineIds()) {
//                Medicine medicine = medicineRepository.findById(medicineId)
//                        .orElseThrow(() -> new BadRequestException("Medicine with ID " + medicineId + " not found"));
//                medicines.add(medicine);
////                medicine.getSellers().add(seller);
//                medicineRepository.save(medicine);
//            }
////            seller.setMedicines(medicines);
////            logger.info("Medicines assigned to seller: " + medicines.size());
//        }
//
//        sellerRepository.save(seller);
//        logger.info("Seller with email " + req.getEmail() + " created successfully.");
    }

    public List<SellerResponse> getAllSellers() {
        return sellerRepository.findAll().stream().map(seller -> SellerResponse.builder().id(seller.getId()).name(seller.getName()).email(seller.getEmail())
                .location(seller.getLocation()).phone(seller.getPhone()).build()).toList();
    }

    public SellerResponse getSellerById(Integer id) {
        Seller seller = sellerRepository.findById(id).orElseThrow();
        List <Integer> medicineIds = seller.getMedicines().stream().map(Medicine::getId).toList();
        return SellerResponse.builder().id(seller.getId()).name(seller.getName()).email(seller.getEmail())
                .location(seller.getLocation()).phone(seller.getPhone()).medicineIds(medicineIds).build();
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
