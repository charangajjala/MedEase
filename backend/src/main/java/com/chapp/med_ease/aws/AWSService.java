package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AWSService {

    private final AmazonS3 s3Client;

    public List<Bucket> listBuckets() {
        return s3Client.listBuckets();
    }
}
