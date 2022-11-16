package be.wiselife.challengetalk.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class ChallengeTalkDto {

    @Getter
    public static class Post{
        @NotBlank
        private String challengeTalkBody;

        private String memberName;
    }

}
