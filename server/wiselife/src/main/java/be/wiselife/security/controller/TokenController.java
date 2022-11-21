package be.wiselife.security.controller;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;


@RequiredArgsConstructor
@RestController
@Validated
@Slf4j
@RequestMapping("/token")
public class TokenController {

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping()
    public ResponseEntity<String> refreshTokenValidator(HttpServletRequest request) {

        String accessToken = "";
        String refreshToken = "";

        String refreshTokenEmail = extractEmailFromToken(request.getHeader("Refresh"));
        Date refresh = extractDateFromToken(request.getHeader("Refresh"));
        Date current = Calendar.getInstance().getTime();

        if (refresh.before(current)) { // 시간을 비교후 전달한다.
            Member member = memberService.findMemberByEmail(refreshTokenEmail);
            // 2. 엑세스   토큰과 리프레쉬 토큰을 발급한다.
            accessToken = makeAccessToken(member);
            refreshToken = makeRefreshToken(member);
        } else {
            throw new BusinessLogicException(ExceptionCode.REFRESHTOKEN_EXPIRED);
        }

        return ResponseEntity.accepted()
                .header("Authorization", "Bearer " + accessToken)
                .header("Refresh", refreshToken)
                .body("new token");

    }


    private String extractEmailFromToken(String JwtToken) {
        Jws<Claims> Claims = jwtTokenizer.verifySignature(JwtToken);
        return (String) Claims.getBody().get("sub");
    }
    private Date extractDateFromToken(String JwtToken) {
        Jws<Claims> Claims = jwtTokenizer.verifySignature(JwtToken);
        int iat = (int) Claims.getBody().get("iat");
        return Date.from(Instant.ofEpochSecond(iat));
    }

    private String makeRefreshToken(Member member) {
        //1. 검증수단을 확인
        String subject = member.getMemberEmail();
        //2. 만료된 기한을 yml 파일에서 지정한 시간만큼 업데이트 하고 비번도 재 암호화
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshToken());
        String secretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey());
        //3. 합치기
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, secretKey);

        return refreshToken;

    }

    /**
     * 엑세스 토큰 만들기
     * @param member
     * @return
     */
    private String makeAccessToken(Member member) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("userEmail", member.getMemberEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getMemberEmail();
        //1. jwt에 설정한 시간을 여기에 적용해서 저장
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessToken());
        //2. jwt에 설정한 비번을 암호화
        String secretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey());
        //3. 설정한 값들을 accessToken에 넣기
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, secretKey);

        return accessToken;
    }
}
