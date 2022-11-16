package be.wiselife.security.principal;

import java.util.Map;

public interface OAuth2MemberInfo {
    Map<String, Object> getAttributes();
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

    String getImageURL();
}
