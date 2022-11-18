package be.wiselife.security;


import be.wiselife.security.filter.MemberAuthenticationEntryPoint;
import be.wiselife.security.handler.MemberAccessDeniedHandler;
import be.wiselife.security.service.OauthService;
import be.wiselife.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

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
                .headers().frameOptions().sameOrigin() //동일 출처로부터 들어오는 request만 페이지 렌더링을 허용
                .and()
                .csrf().disable() //CSRF 공격 방어 안하겠다~ (로컬환경에서 진행할꺼라, 안하면 403에러 발생함)
                .cors(withDefaults()) // 아래의 corsCofiguartionSource 소환 APP간의 출처가 다른경우 http통신을 통한 리소스 접근이 제한됨
                //cors친구가 다른 스크립트 기반 http통신을 해도 선택적으로 리소스에 접근할 수있는 권한을 부여하도록 브라우저에게 알려줌

                .formLogin().disable() //기본으로 제공하는 form 로그인 인증 기능 안쓰겠다.
                .httpBasic().disable() //https 가능하면

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()

//                .apply(new CustomFilterConfig())
//                .and()
                /*-----추후 어느정도 구성이 완료되고 인가 관련 설정----*/
                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.POST, "/*/questions/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/questions/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.DELETE, "/*/questions/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.POST, "/*/user/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/user/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.DELETE, "/*/user/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.POST, "/*/answer/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/answer/**").hasAnyRole("ADMIN","USER")
//                        .antMatchers(HttpMethod.DELETE, "/*/answer/**").hasAnyRole("ADMIN","USER")
                                .anyRequest().permitAll() //그외 get 요청은 전부다 가능하도록
                )
                .oauth2Login()
                .defaultSuccessUrl("/")
                .failureUrl("/login") //로그인 실패시 이동해야하는 위치
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

        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Accept","X-Requested-With","Content-Type","Access-Control-Request-Method",
                "Access-Control-Request-Headers","Authorization","Refresh","Connection","Content","Host",
                "Referer","Access-Control-Allow-Origin"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.setMaxAge(4600l);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        
        return source;
    }
    //TODO: 권한설정하기
}
