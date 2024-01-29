package com.chapp.med_ease.config;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AWSConfig {

    public AWSCredentials credentials() {
        return new BasicAWSCredentials(
                "AKIA47CRV5V3RKT7LK5J",
                "FaN9u5ITwZIYaxsJz08zkXtoXgwk6HsbYeH6obnP"
        );
    }

    @Bean
    public AmazonS3 amazonS3() {
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials()))
                .withRegion("us-east-2")
                .build();
    }
}
