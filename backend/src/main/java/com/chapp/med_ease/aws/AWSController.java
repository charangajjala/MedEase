package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.model.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/aws/")
public class AWSController {

    @Autowired
    private AWSService awsService;

    @PostMapping("/createBucket")
    public ResponseEntity<Bucket> createBucket(String bucketName) {
        try{
            Bucket bucket = awsService.createBucket(bucketName);
            return ResponseEntity.ok(bucket);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/listBuckets")
    public ResponseEntity<List<Bucket>> listBuckets() {
        return ResponseEntity.ok(awsService.listBuckets());
    }
}
