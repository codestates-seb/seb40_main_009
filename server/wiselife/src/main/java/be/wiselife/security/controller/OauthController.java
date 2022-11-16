package be.wiselife.security.controller;

import be.wiselife.security.dto.LoginDto;
import be.wiselife.security.service.OauthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
public class OauthController {
    private final OauthService oauthservice;

    //https://localhost:8080/oauth/kakao?code=RgxBArRwonw1qxP7pKeo81n9XWHfLvvhmXKNnL86bNalZdvUj5ahX2apy3-tkbCkwNJ-HQopdSkAAAGEevxXXw
    //로그인후 약관 동의를 하면 위와같이 연락이온다.
    @GetMapping("/oauth/{provider}")
    public ResponseEntity Oauth2login(@PathVariable String provider, @RequestParam String code) throws JsonProcessingException {
        LoginDto loginDto = oauthservice.login(provider, code);

        return new ResponseEntity<>(loginDto, HttpStatus.ACCEPTED);
    }

}
