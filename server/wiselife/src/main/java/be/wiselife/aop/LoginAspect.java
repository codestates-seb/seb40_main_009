package be.wiselife.aop;

import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
@EnableAspectJAutoProxy
public class LoginAspect {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @Around("@annotation(be.wiselife.aop.NeedEmail)")
    public Object getEmail(ProceedingJoinPoint joinPoint) throws  Throwable {
        // 애플리케이션에서 Request 객체를 읽어옴
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        Object[] parmeterlist = joinPoint.getArgs(); //요청 파라미터값

        if (request != null) {
            String email = jwtTokenizer.getEmailWithToken(request);
            parmeterlist[0] = email;
        }

        Object resultObj = joinPoint.proceed(parmeterlist);

        return resultObj;
    }
//argument resolver
    @Around("@annotation(be.wiselife.aop.NeedMember)")
    public Object getMember(ProceedingJoinPoint joinPoint) throws  Throwable {
        // 애플리케이션에서 Request 객체를 읽어옴
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        Object[] parmeterlist = joinPoint.getArgs(); //요청 파라미터값

        if (request != null) {
            Member loginMember = memberService.getLoginMember(request);
            parmeterlist[0] = loginMember;
        }

        Object resultObj = joinPoint.proceed(parmeterlist);

        return resultObj;
    }


}
