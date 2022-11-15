package be.wiselife.challenge.dto;

import be.wiselife.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ChallengeDto {

    @Getter
    public static class Post {
        @NotBlank
        private String challengeCategory;

        @NotBlank
        private String challengeTitle;
        @NotBlank
        private String challengeDescription;

        private int challengeMaxParty;

        private int challengeMinParty;
        @NotBlank
        private LocalDate challengeStartDate;
        @NotBlank
        private LocalDate challengeEndDate;
        @NotBlank
        private String challengeAuthDescription;
        @NotBlank
        private int challengeAuthCycle;
        @NotBlank
        private int challengeFeePerPerson; //인당 참여금액

    }

    @Getter
    @Builder
    public static class Response {
        @NotBlank
        private Long challengeId;
        @NotBlank
        private Challenge.ChallengeCategory challengeCategory;
        @NotBlank
        private String challengeTitle;
        @NotBlank
        private String challengeDescription;
        @NotBlank
        private int challengeCurrentParty;

        private int challengeMaxParty;

        private int challengeMinParty;
        @NotBlank
        private LocalDate challengeStartDate;
        @NotBlank
        private LocalDate challengeEndDate;
        @NotBlank
        private String challengeAuthDescription;
        @NotBlank
        private int challengeAuthCycle;

        private String challengeDirectLink;//이건 프런트가 해야하지 않나??
        @NotBlank
        private int challengeFeePerPerson; //인당 참여금액
        @NotBlank
        private int challengeTotalReward; // 현재까지의 전체 상금
        @NotBlank
        private int challengeViewCount;
        @NotBlank
        private Boolean isClosed;

        /*별도로 계산해야 하는 값들*/
//    private int 챌린지 평균 성공률
//    private int 접속하고 있는 유저의 성공률(이 챌린지에 참여중이라면)
    }

}
