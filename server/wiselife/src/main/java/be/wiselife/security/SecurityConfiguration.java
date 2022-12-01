package be.wiselife.security;


import be.wiselife.security.filter.MemberAuthenticationEntryPoint;
import be.wiselife.security.handler.MemberAccessDeniedHandler;
import be.wiselife.security.service.OauthService;
import be.wiselife.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * 스프링 시큐리티의 가장 첫단추
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration{

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final OauthService oauthservice;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


        http
                .headers().frameOptions().disable()
                .and()
                .csrf().disable() //CSRF 공격 방어 안하겠다~ 쿠키를 사용한 인증을 안할꺼라서
                .cors().configurationSource(corsConfigurationSource()) // 아래의 corsCofiguartionSource 소환 APP간의 출처가 다른경우 http통신을 통한 리소스 접근이 제한됨
                //cors친구가 다른 스크립트 기반 http통신을 해도 선택적으로 리소스에 접근할 수있는 권한을 부여하도록 브라우저에게 알려줌
                .and()
                .formLogin().disable() //기본으로 제공하는 form 로그인 인증 기능 안쓰겠다.
                .httpBasic().disable() //TODO: https 가능하면

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint()) //인증에러 발생시
                .accessDeniedHandler(new MemberAccessDeniedHandler()) //인가 에러 핸들링
                .and()
                /*-----추후 어느정도 구성이 완료되고 인가 관련 설정----*/
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/order/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/order/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/order/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/member/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/member/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/member/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/follow/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/follow/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/follow/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/challenge-talks/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/challenge-talks/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/challenge-talks/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/challenge-reviews/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/challenge-reviews/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/challenge-reviews/**").hasAnyRole("USER")
                        .anyRequest().permitAll() //그외 get 요청은 전부다 가능하도록
                )
                .oauth2Login()
                .defaultSuccessUrl("/")
                .failureUrl("/") //로그인 실패시 이동해야하는 위치
                .userInfoEndpoint() //로그인 성공후 사용자정보를 가져오겠다.
                .userService(oauthservice);

        return http.build();
    }


    /**
     * 삭제와 생성을 할수있도록 spring bean 등록해야함.
     * bean설정을 따로 해줘야한다. 안하면 service단에서 빈을 자동생성 못함.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     *  CORS 관련 설정
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("https://wiselife.click");
        configuration.addAllowedOrigin("http://wiselife-client.s3-website.ap-northeast-2.amazonaws.com/");
         configuration.addAllowedOrigin("https://just.wiselife.click");
        configuration.addAllowedHeader("*");
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTIONS"));

        configuration.setAllowCredentials(true);
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.setMaxAge(4600l);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }

}
