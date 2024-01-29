package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AWSService {

    @Autowired
    private AmazonS3 amazonS3;

    public Bucket createBucket(String bucketName) {
        if (!amazonS3.doesBucketExistV2(bucketName)) {
            return amazonS3.createBucket(new CreateBucketRequest(bucketName));
        } throw new IllegalArgumentException("Bucket name is not available.");
    }

    public List<Bucket> listBuckets() {
        return amazonS3.listBuckets();
    }
}
