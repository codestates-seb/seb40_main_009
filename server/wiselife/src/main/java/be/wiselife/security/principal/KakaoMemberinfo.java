package be.wiselife.security.principal;

import lombok.Getter;

import java.util.Map;

@Getter
public class KakaoMemberinfo implements OAuth2MemberInfo{
    private Map<String, Object> attributes;

    public KakaoMemberinfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) getKakaoAccount().get("email");
    }

    @Override
    public String getName() {
        return (String) getProfile().get("nickname");
    }

    @Override
    public String getImageURL() {
        return (String) getProfile().get("profile_image_url");
    }

    public Map<String, Object> getKakaoAccount(){
        return(Map<String, Object>) attributes.get("kakao_account");
    }

    public Map<String, Object> getProfile(){
        return (Map<String, Object>) getKakaoAccount().get("profile");
    }
}
