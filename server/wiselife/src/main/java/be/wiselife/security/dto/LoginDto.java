package be.wiselife.security.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.management.relation.Role;

/**
 * 원하는 데이터만 뽑아서 반환
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
    private double memberMoney;

}