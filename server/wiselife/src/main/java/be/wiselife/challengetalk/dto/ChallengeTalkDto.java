package be.wiselife.challengetalk.dto;

import be.wiselife.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
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
        private Long challengeTalkId;
        private String challengeTalkBody;
        private Long memberId;
        private String memberName;
        private String memberBadge;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime created_at;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updated_at;

    }

}
