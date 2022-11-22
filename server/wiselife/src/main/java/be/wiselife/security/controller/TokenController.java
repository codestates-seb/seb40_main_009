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
        String newAccessToken = "";
        String refreshTokenFromFront = request.getHeader("Refresh");

        Member ExpiredMember = memberService.findByRefreshToken(refreshTokenFromFront);
        String accessTokenEmail = ExpiredMember.getMemberEmail();

        Date refresh = extractDateFromToken(refreshTokenFromFront);
        Date current = Calendar.getInstance().getTime();

        if (current.before(refresh)) { // 리프레쉬 만기여부
            newAccessToken = jwtTokenizer.createAccessToken(accessTokenEmail);
            }
            else {
                throw new BusinessLogicException(ExceptionCode.REFRESHTOKEN_EXPIRED);
            }

        return ResponseEntity.accepted()
                .header("Authorization", newAccessToken)
                .body("new token");

    }

    private Date extractDateFromToken(String JwtToken) {
        Jws<Claims> Claims = jwtTokenizer.getClaims(JwtToken,jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey()));
        int exp = (int) Claims.getBody().get("exp");
        return Date.from(Instant.ofEpochSecond(exp));
    }

}
