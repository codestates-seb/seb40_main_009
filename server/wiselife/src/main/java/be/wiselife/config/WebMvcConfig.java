package be.wiselife.config;

import be.wiselife.interceptor.ChallengeCertImageInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Slf4j
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(challengeCertImageInterceptor()).addPathPatterns("/challenges/cert/**");
    }

    @Bean
    public ChallengeCertImageInterceptor challengeCertImageInterceptor(){
        return new ChallengeCertImageInterceptor();
    }
}
