package be.wiselife.security.principal;

import java.util.Map;

public class NaverMemberInfo implements OAuth2MemberInfo{
    private Map<String, Object> attributes;
    private Map<String, Object> attributeResponse;

    public NaverMemberInfo(Map<String, Object> attributes) {
        this.attributes = (Map<String, Object>) attributes.get("response");
        this.attributeResponse = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getProviderId() {
        return attributeResponse.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getEmail() {
        return attributeResponse.get("email").toString();
    }

    @Override
    public String getName() {
        return attributeResponse.get("name").toString();
    }

    @Override
    public String getImageURL() {
        return attributeResponse.get("profile_image").toString();
    }
}
