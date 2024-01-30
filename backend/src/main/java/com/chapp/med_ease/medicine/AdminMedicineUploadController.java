package com.chapp.med_ease.medicine;

import com.chapp.med_ease.aws.AWSService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AdminMedicineUploadController {

    private final AWSService awsService;

    public AdminMedicineUploadController(AWSService awsService) {
        this.awsService = awsService;
    }

    @PostMapping("/admin/medicine/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file")MultipartFile file) {
        try {
            String bucketName = "medeaseportal-bucket";
            String keyName = file.getOriginalFilename();
            awsService.uploadObject(bucketName, keyName, file);
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
