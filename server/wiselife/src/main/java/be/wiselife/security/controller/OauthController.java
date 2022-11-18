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

    /**
     * 로그인후 약관 동의 -> 호출되는 메서드
     * @param provider 소셜로그인 제공 기관
     * @param code 카톡측에서 보내주는 인증코드
     * @return 맴버에 대한 모든 정보를 반환한다.
     */
    @GetMapping("/oauth/{provider}")
    public ResponseEntity Oauth2login(@PathVariable String provider, @RequestParam String code){
        LoginDto loginDto = oauthservice.login(provider, code);

        return new ResponseEntity<>(loginDto, HttpStatus.ACCEPTED);
    }

}
