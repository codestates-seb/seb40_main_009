package be.wiselife.security.principal;

import java.util.Map;

/**
 * Oauth2에서 로그인시 기본적으로 요청하는 데이터양식
 */
public interface OAuth2MemberInfo {
    Map<String, Object> getAttributes();
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

    String getImageURL();
}
