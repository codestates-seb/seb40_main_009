package be.wiselife.security.service;

import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.security.JwtTokenizer;
import be.wiselife.security.dto.AccessTokenDto;
import be.wiselife.security.dto.LoginDto;
import be.wiselife.security.principal.KakaoMemberinfo;
import be.wiselife.security.principal.OAuth2MemberInfo;
import be.wiselife.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
@Slf4j
public class OauthService extends DefaultOAuth2UserService {
    
    private final InMemoryClientRegistrationRepository inMemoryRepository; // app-oauth에 있는 정보가져오기
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;

    /**
     *  1번쨰 마주하는곳
     *  사실상 모든 과정이 이 메서드에서 다 이루어진다.
     */
    public LoginDto login(String provider, String code){ //인가code를 카톡Oauth서버에 token요청
        ClientRegistration kakaoProvider = inMemoryRepository.findByRegistrationId(provider); //yaml에 저장된 데이터 뽑아오기
        AccessTokenDto tokenData = getAuthorizationToken(code, kakaoProvider); //서버에 엑세스 토큰과 리프레쉬 토큰을 받아오는 메서드, 이걸로 이제 회원 프로필 이름,이메일을 가져올수있다.
        Member member = getMemberProfile(provider, tokenData, kakaoProvider); //첫 로그인이라면 회원가입 아니면 디비 맴버 반환
        //인증후 토큰 발부
        String accessToken = jwtTokenizer.createAccessToken(String.valueOf(member.getMemberEmail()));
        String refreshToken = jwtTokenizer.createRefreshToken();

        LoginDto loginDto = LoginDto.builder().memberId(member.getMemberId()).memberEmail(member.getMemberEmail()).memberName(member.getMemberName())
                .imageUrl(member.getMemberImage()).AccessToken(accessToken).RefreshToken(refreshToken).build();

        return loginDto;
    }

    /**
     * 서버에 엑세스 토큰과 리프레쉬 토큰을 받아오는 메서드
     * @param code
     * @param provider
     * @return
     */
    private AccessTokenDto getAuthorizationToken(String code, ClientRegistration provider) {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type","authorization_code");
        parameters.add("client_id", provider.getClientId());
        parameters.add("redirect_uri", provider.getRedirectUri());
        parameters.add("client_secret", provider.getClientSecret());
        parameters.add("code",code);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        RestTemplate restTemplate = new RestTemplate();
        AccessTokenDto accessTokenDto = restTemplate.postForObject(provider.getProviderDetails().getTokenUri(), requestEntity, AccessTokenDto.class);
        return accessTokenDto;
    }

    private Member getMemberProfile(String providerName, AccessTokenDto tokenData, ClientRegistration provider) {
         Map<String, Object> userAttributes = getMemberAttributes(provider, tokenData);

         //소셜로그인 만에하나 더 추가한다면...
         OAuth2MemberInfo oAuth2MemberInfo = null;
        if (providerName.equals("kakao")) {
            oAuth2MemberInfo = new KakaoMemberinfo(userAttributes);
        } else {
            log.info("지원하지않는 로그인 방식");
        }

        /* 데이터들 넣는 작업 */
        String provide = oAuth2MemberInfo.getProvider();
        String providerId = oAuth2MemberInfo.getProviderId();
        String email = oAuth2MemberInfo.getEmail();
        String imageURL = oAuth2MemberInfo.getImageURL();
        List<String> rolesForDatabase = new CustomAuthorityUtils().createRolesForDatabase(email);

        //DB에 없는 사람이면 저장하고 있는사람이면 반환
        //orElse는 메모리상에 있기만 하면 무조건 호출이라서 orElseGet으로 호출해야한다.
        Member member = memberRepository.findByMemberEmail(email)
                .orElseGet(()-> memberRepository.save(new Member(email,imageURL,rolesForDatabase,provide,providerId)));


        return member;

    }

    private Map<String, Object> getMemberAttributes(ClientRegistration provider, AccessTokenDto tokenData) {

        HttpHeaders headers = new HttpHeaders(); //헤더에 들어갈 항목
        headers.set("Authorization","Bearer "+tokenData.getAccess_token());

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers); //해더를 담을 객체생성

        RestTemplate restTemplate = new RestTemplate();
        //restTemplate의 리턴값을 제네릭을 이용해서 설정한 방법 ParameterizedTypeReference사용
        Map<String, Object> body = restTemplate.exchange(provider.getProviderDetails().getUserInfoEndpoint().getUri(),
                HttpMethod.GET, requestEntity, new ParameterizedTypeReference<Map<String, Object>>(){}).getBody();

        return body;
    }


}
