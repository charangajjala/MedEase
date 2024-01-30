package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import com.amazonaws.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AWSService {

    private final AmazonS3 s3Client;

    public List<Bucket> listBuckets() {
        return s3Client.listBuckets();
    }

    public List<String> listObjects(String bucketName) {
        return s3Client.listObjects(bucketName).getObjectSummaries().stream()
                .map(S3ObjectSummary::getKey)
                .toList();
    }

    public void uploadObject(String bucketName, String keyName, MultipartFile file) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        s3Client.putObject(bucketName, keyName, file.getInputStream(), metadata);
    }

    public byte[] getObject(String bucketName, String keyName) throws IOException {
        try {
            S3Object s3Object = s3Client.getObject(bucketName, keyName);
            InputStream objectData = s3Object.getObjectContent();
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int nRead;
            byte[] data = new byte[1024];
            while ((nRead = objectData.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
            buffer.flush();
            return buffer.toByteArray();
        } catch (Exception e) {
            throw new IOException("Error getting object from S3", e);
        }
    }

//    Currently the bucket is public incase if we want to make it private use this code for url generation
    public String generatePresignedUrl(String bucketName, String objectKey, int expirationMinutes) {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000L * 60 * expirationMinutes;
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, objectKey)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);

        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }
}
