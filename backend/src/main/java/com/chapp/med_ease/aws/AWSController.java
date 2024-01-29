package com.chapp.med_ease.aws;

import com.amazonaws.services.s3.model.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

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
}
