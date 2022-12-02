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
import org.springframework.transaction.annotation.Transactional;
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

    private final CustomAuthorityUtils authorityUtils;

    /**
     *  로그인의 모든 과정이 이 메서드에서 다 이루어진다.
     *  1. 인가코드를 카톡 Oauth2서버에 토큰을 요청함. (프론트에서 이루어짐)
     *  2. yaml에 저장된 데이터 뽑아와서 카톡서버로 데이터를 수령해온다.
     *  3. 수령해온 데이터를 이용하여 AccessToken과 RefreshToken을 만든다
     *  4. 첫 로그인이라면 회원가입처리가 되고 아니면 로그인이 된다.
     * @return 카톡측으로부터 수령한 회원 개인정보를 반환한다.
     */
    public LoginDto login(String provider, String code){
        //2
        ClientRegistration kakaoProvider = inMemoryRepository.findByRegistrationId(provider);
        AccessTokenDto tokenData = getAuthorizationToken(code, kakaoProvider);
        String refreshToken = jwtTokenizer.createRefreshToken();
        Member member = getMemberProfile(provider, tokenData, kakaoProvider, refreshToken);

        //3
        String accessToken = jwtTokenizer.createAccessToken(String.valueOf(member.getMemberEmail()));


        //4
        LoginDto loginDto = LoginDto.builder().memberId(member.getMemberId()).memberEmail(member.getMemberEmail()).memberName(member.getMemberName())
                .imageUrl(member.getMemberImagePath()).AccessToken(accessToken).RefreshToken(refreshToken).memberMoney(member.getMemberMoney()).build();

        return loginDto;
    }

    /**
     * 서버에 엑세스 토큰과 리프레쉬 토큰을 받아오는 메서드
     * @param code 카톡에서 발행한 인가코드
     * @param provider 소셜로그인 제공 기관
     * @return 카톡에서 제공하는 토큰값들을 받는다.
     */
    private AccessTokenDto getAuthorizationToken(String code, ClientRegistration provider) {
        //카톡측 요구 파라미터
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type","authorization_code");
        parameters.add("client_id", provider.getClientId());
        parameters.add("redirect_uri", provider.getRedirectUri());
        parameters.add("client_secret", provider.getClientSecret());
        parameters.add("code",code);
        //카톡측 요구 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, headers);

        RestTemplate restTemplate = new RestTemplate();
        AccessTokenDto accessTokenDto = restTemplate.postForObject(provider.getProviderDetails().getTokenUri(), requestEntity, AccessTokenDto.class);
        return accessTokenDto;
    }

    /**
     * 카톡측으로 맴버의 정보를 받아오는 로직
     *
     * @param providerName 소셜로그인 제공 기관
     * @param tokenData
     * @param provider
     * @param refreshToken
     * @return
     */
    private Member getMemberProfile(String providerName, AccessTokenDto tokenData, ClientRegistration provider, String refreshToken) {
         Map<String, Object> userAttributes = getMemberAttributes(provider, tokenData);

         OAuth2MemberInfo oAuth2MemberInfo = null;
        if (providerName.equals("kakao")) {
            oAuth2MemberInfo = new KakaoMemberinfo(userAttributes);
        } else {
            log.info("지원하지않는 로그인 방식");
        }

        /* 카톡에서 받아온 데이터를 넣는 작업 */
        String provide = oAuth2MemberInfo.getProvider();
        String providerId = oAuth2MemberInfo.getProviderId();
        String email = oAuth2MemberInfo.getEmail();
        String imageURL = oAuth2MemberInfo.getImageURL();
        List<String> rolesForDatabase = authorityUtils.createRolesForDatabase(email);

        Member member = memberRepository.findByMemberEmail(email)
                .orElseGet(()-> memberRepository.save(new Member(email,imageURL,rolesForDatabase,provide,providerId,refreshToken)));
        //orElse는 메모리상에 있기만 하면 무조건 호출이라서 orElseGet으로 호출해야한다.
        // 이미 저장된 맴버면 로그인시 refreshToken을 새로 발부후 저장한다.
        member.setRefreshToken(refreshToken);
        memberRepository.save(member);
        return member;

    }

    private Map<String, Object> getMemberAttributes(ClientRegistration provider, AccessTokenDto tokenData) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization","Bearer "+tokenData.getAccess_token());

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = restTemplate.exchange(provider.getProviderDetails().getUserInfoEndpoint().getUri(),
                HttpMethod.GET, requestEntity, new ParameterizedTypeReference<Map<String, Object>>(){}).getBody();
        //restTemplate의 리턴값을 제네릭을 이용해서 설정한 방법 ParameterizedTypeReference사용
        return body;
    }


}
