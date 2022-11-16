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
        @NotNull
        @Range(min = 1, max = 3) // 1: 버킷 리스트 2: 공유 챌린지 3: 오프라인 챌린지
        private int challengeCategoryId;
        @NotBlank
        private String challengeTitle;
        @NotBlank
        private String challengeDescription;

        private int challengeMaxParty;

        private int challengeMinParty;
        @NotBlank
        private String challengeStartDate;
        @NotBlank
        private String challengeEndDate;
        @NotBlank
        private String challengeAuthDescription;
        @NotNull
        private int challengeAuthCycle;
        @NotNull
        private int challengeFeePerPerson; //인당 참여금액

    }

    @Getter
    public static class Patch {
        @NotNull
        private Long challengeId;

        @Range(min = 1, max = 3) // 1: 버킷 리스트 2: 공유 챌린지 3: 오프라인 챌린지
        private int challengeCategoryId;

        private String challengeTitle;

        private String challengeDescription;

        private int challengeMaxParty;

        private int challengeMinParty;

        private String challengeStartDate;

        private String challengeEndDate;

        private String challengeAuthDescription;

        private int challengeAuthCycle;

        private int challengeFeePerPerson; //인당 참여금액

    }

    @Getter
    @Builder
    public static class Response {

        private Long challengeId;

        private Challenge.ChallengeCategory challengeCategory;

        private String challengeTitle;

        private String challengeDescription;

        private int challengeCurrentParty;

        private int challengeMaxParty;

        private int challengeMinParty;

        private LocalDate challengeStartDate;

        private LocalDate challengeEndDate;

        private String challengeAuthDescription;

        private int challengeAuthCycle;

        private String challengeDirectLink;//이건 프런트가 해야하지 않나??

        private int challengeFeePerPerson; //인당 참여금액

        private int challengeTotalReward; // 현재까지의 전체 상금

        private int challengeViewCount;

        private Boolean isClosed;

        /*별도로 계산해야 하는 값들*/
//    private int 챌린지 평균 성공률
//    private int 접속하고 있는 유저의 성공률(이 챌린지에 참여중이라면)
    }

}
