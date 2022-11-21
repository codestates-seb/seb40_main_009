package be.wiselife.challengetalk.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ChallengeTalkDto {

    @Getter
    public static class Post{
        @NotBlank
        private String challengeTalkBody;
        @NotNull
        private Long challengeId;
    }

    @Getter
    public static class Patch{
        @Setter
        private Long challengeTalkId;

        private String challengeTalkBody;

    }


    @Getter
    @Setter
    public static class response{
        private String challengeTalkBody;
        private String memberName;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;

    }

}
