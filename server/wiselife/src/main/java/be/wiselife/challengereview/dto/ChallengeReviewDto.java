package be.wiselife.challengereview.dto;

import be.wiselife.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class ChallengeReviewDto {

    @Getter
    public static class Post{
        @NotNull
        private Long challengeId;
        @NotBlank
        private String challengeReviewTitle;
        @NotBlank
        private String challengeReviewContent;
        @NotNull
        @Range(min =0 , max = 5)
        private int challengeReviewStar;

    }

    @Setter
    @Getter
    public static class Response {
        private Long challengeReviewId;

        private Long challengeId;

        private String challengeReviewTitle;

        private String challengeReviewContent;

        private int challengeReviewStar;

        private String memberName;

        private Member.MemberBadge memberBadge;

        private String challengeReviewImagePath;
    }

    @Getter
    public static class Patch {
        @Setter
        private Long challengeReviewId;

        private String challengeReviewTitle;

        private String challengeReviewContent;

        private int challengeReviewStar;

    }
}
