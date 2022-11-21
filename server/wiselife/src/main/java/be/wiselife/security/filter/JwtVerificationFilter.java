package be.wiselife.security.filter;

import be.wiselife.security.JwtTokenizer;
import be.wiselife.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims); //시큐어 컨텍스트에 권한 객체를 저장하기위한 메서드 유효기간내에 있으면 반납한다.

        } catch (SignatureException signatureException) {
            request.setAttribute("exception", signatureException); // 토큰 자체가 이상하면 호출되는 메서드
        }
        catch (ExpiredJwtException expiredJwtException) {
            request.setAttribute("exception", expiredJwtException);
        }
        catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization"); // jwt 서명받으면 jws
        String base64EncodedSecretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey()); // jwt 서명을 검증하기 위한 비밀키( jwt 자체의 비밀키)
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // 검증받은 내용과 jws를 파싱함.

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String userEmail = (String) claims.get("sub"); //??
        List<GrantedAuthority> roles = authorityUtils.DependsRole((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userEmail, null, roles);  // 토큰에다가 유저 이메일과 권한정보를 넣는다 비번은 뺌.
        SecurityContextHolder.getContext().setAuthentication(authentication); // 시큐어컨텍스트에 권한 객체를 저장
    }
}
