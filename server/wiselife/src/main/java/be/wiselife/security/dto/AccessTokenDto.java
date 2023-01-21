package be.wiselife.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
/*
* 인가코드로 엑세스토큰, 리프레쉬 토큰 받아오기
 */
@Getter
@Setter
@ToString
public class AccessTokenDto {
    private String token_type;
    private String access_token;
    private String id_token;
    private int expires_in;
    private String refresh_token;
    private int refresh_token_expires_in;
    private String scope;
}

