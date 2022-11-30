package be.wiselife.aws.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aws/health")
public class Aws {

    @GetMapping
    public ResponseEntity getHealthCheck(){
        return new ResponseEntity(HttpStatus.OK);
    }
}
