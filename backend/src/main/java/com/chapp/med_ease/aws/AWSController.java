package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.model.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aws")
@RequiredArgsConstructor
public class AWSController {

    private final AWSService awsService;

    @GetMapping("/listBuckets")
    public String listBuckets() {
        var buckets = awsService.listBuckets();
        var names = buckets.stream().map(Bucket::getName).toList();
        return String.join(", ", names);
    }

    @GetMapping("/{bucket}")
    public List<String> listObjects(@PathVariable String bucket) {
        return awsService.listObjects(bucket);
    }

//    Incase if we want to make the bucket private use this code for url generation
    @GetMapping("/presignedUrl/{bucket}/{objectKey}")
    public ResponseEntity<String> getPresignedUrl(@PathVariable String bucket, @PathVariable String objectKey) {
        try {
            String url = awsService.generatePresignedUrl(bucket, objectKey, 5);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
