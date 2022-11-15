package be.wiselife.security.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.management.relation.Role;

/**
 * 데이터 입력시 filter에서 알아볼수 있게 역직렬화 (stream of byte -> object)
 */

@Getter
@Setter
@Builder
@ToString
public class LoginDto {
    private Long memberId;
    private String memberEmail;
    private String memberName;
    private String imageUrl;
    private String AccessToken;
    private String RefreshToken;

}