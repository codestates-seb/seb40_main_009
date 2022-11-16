package be.wiselife.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.Random;

/*
 * jwt 토큰을 사용하기 위한 메서드
 */
@Component
@RequiredArgsConstructor
public class JwtTokenizer {
    //해당 정보들은 yml파일에 저장하기 JWT의 기본정보 엑세스토큰과 리프레쉬토큰
    @Getter
    @Value("${jwt.token.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token.expire-length}")
    private int accessToken;        // 엑세스 토큰

    @Getter
    @Value("${jwt.refresh-token.expire-length}")
    private int refreshToken;          // 리프레쉬 토큰


    public String createAccessToken(String payload) {
        return createToken(payload, accessToken);
    }

    public String createRefreshToken() {
        byte[] array = new byte[7];
        new Random().nextBytes(array);
        String generatedString = new String(array, StandardCharsets.UTF_8);
        return createToken(generatedString, refreshToken);
    }

    public String createToken(String payload, long expireLength) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date now = new Date();
        Date validity = new Date(now.getTime() + expireLength);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getKeyFromBase64EncodedKey(makingSecretKey(secretKey)))
                .compact();
    }

    public String getPayload(String token){
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKeyFromBase64EncodedKey(makingSecretKey(secretKey)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getSubject();
        } catch (JwtException e){
            throw new RuntimeException("유효하지 않은 토큰 입니다");
        }
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(getKeyFromBase64EncodedKey(makingSecretKey(secretKey)))
                    .build()
                    .parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            return false;
        }
    }

   /*
     * 보안키 비번을 암호화
     */

    public String makingSecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /*
     * 비밀번호 제작 메서드
     */
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public String getEmailWithToken(HttpServletRequest request) {
        //HEADER에 있는 복호화된 값을 가져옴
        String authorization = request.getHeader("Authorization");
        String[] split = authorization.split("\\ "); //asdasdasd.adasdasd.asdasdasd 이런식으로 되어있어서 나눈다.

        try {
            Claims body = Jwts.parserBuilder().setSigningKey(getKeyFromBase64EncodedKey(makingSecretKey(secretKey)))
                    .build().parseClaimsJws(split[1]).getBody(); //값을 넣어서 되돌려받는다.
            return  (String) body.get("sub"); //우리가 그토록 원하는 이메일을 돌려받는다.

        } catch (Exception e) {
            throw e;
        }
    }



    /**
     * 내용 검증을 할때  key값과 인증완료된 토큰값을 넘김
     */
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }
}
