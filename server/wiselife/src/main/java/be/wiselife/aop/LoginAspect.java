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

@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
@EnableAspectJAutoProxy
public class LoginAspect {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @Around("@annotation(be.wiselife.aop.NeedEmail)")  //@within(annotation)
    public Object getEmail(ProceedingJoinPoint joinPoint) throws  Throwable {
        // 애플리케이션에서 Request 객체를 읽어옴
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String email = "";

        if (request != null) {
            email = jwtTokenizer.getEmailWithToken(request);
        }

        if ( email == null || email.equals("") ) {
            log.error("no data");
        }

        Object resultObj = joinPoint.proceed(new Object[] { email });

        return resultObj;
    }

    @Around("@annotation(be.wiselife.aop.NeedMember)")
    public Object getMember(ProceedingJoinPoint joinPoint) throws  Throwable {
        // 애플리케이션에서 Request 객체를 읽어옴
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String email = "";

        if (request != null) {
            Member loginMember = memberService.getLoginMember(request);
        }

        if ( email == null || email.equals("") ) {
            log.error("no data");
        }

        Object resultObj = joinPoint.proceed();

        return resultObj;
    }


}
