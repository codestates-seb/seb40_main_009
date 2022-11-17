package be.wiselife.challenge.dto;

import be.wiselife.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.LastModifiedDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

        //이미지 중 챌린지 생성자가 추가할 사진 필드
        private String challengeRepImagePath;

        private String challengeExamImagePath;
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
    public static class SimpleResponse {

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

        private LocalDateTime created_at;

        private LocalDateTime updated_at;

    }

    @Getter
    @Builder
    public static class DetailResponse {

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

        /*멤버챌린지 테이블의 정보와 합쳐 별도로 계산이 필요한 값들*/
        private int averageChallengeSuccessRate;

        private int currentUserSuccessRate;

        private LocalDateTime created_at;

        private LocalDateTime updated_at;
    }
}
