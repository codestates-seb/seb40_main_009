package be.wiselife.challenge.dto;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.image.entity.ChallengeCertImage;
import be.wiselife.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.LastModifiedDate;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


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

        @Min(value = 1,message = "최소인원은 1명 이상이 되어야 합니다.")
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
        private List<String> challengeAuthAvailableTime;

        private int challengeFeePerPerson; //인당 참여금액
    }

    @Getter
    public static class Patch {
//        @Range(min = 1, max = 3) // 1: 버킷 리스트 2: 공유 챌린지 3: 오프라인 챌린지
        private int challengeCategoryId;

        private String challengeTitle;

        private String challengeDescription;

        private int challengeMaxParty;

        private int challengeMinParty;

        private String challengeStartDate;

        private String challengeEndDate;

        private String challengeAuthDescription;

        private int challengeAuthCycle;

        private List<String> challengeAuthAvailableTime;

        private int challengeFeePerPerson; //인당 참여금액

        //이미지 중 챌린지 생성자가 추가할 사진 필드
        private String challengeRepImagePath;

        private String challengeExamImagePath;

    }

    @Getter
    @Setter
    public static class SimpleResponse {

        private Long challengeId;

        private Challenge.ChallengeCategory challengeCategory;

        private String challengeTitle;

        private String challengeDescription;

        private int challengeCurrentParty;

        private int challengeMaxParty;

        private int challengeMinParty;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate challengeStartDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate challengeEndDate;

        private String challengeAuthDescription;

        private int challengeAuthCycle;

        private List<String> challengeAuthAvailableTime;

        private String challengeDirectLink;

        private int challengeFeePerPerson;

        private double challengeTotalReward;

        private int challengeViewCount;

        private double currentMemberMoney;

        private Boolean isClosed;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime created_at;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updated_at;
        //이미지 중 챌린지 생성자가 추가할 사진 필드
        private String challengeRepImagePath;

        private List<String> challengeExamImagePath;

        private List<ChallengeReviewDto.Response> challengeReviews;

        private Boolean isSimpleResponse;

//        private List<ChallengeReviewDto.Response> challengeReviews;
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
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate challengeStartDate;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate challengeEndDate;

        private String challengeAuthDescription;

        private int challengeAuthCycle;

        private int challengeCurrentMemberTodayAuth;

        private List<String> challengeAuthAvailableTime;

        private String challengeDirectLink;

        @Min(value = 1000,message = "참가금액은 최소 1,000원 이상이 되어야합니다.")
        private int challengeFeePerPerson; //인당 참여금액

        private double challengeTotalReward; // 현재까지의 전체 상금

        private int challengeViewCount;

        private Boolean isClosed;

        /*멤버챌린지 테이블의 정보와 합쳐 별도로 계산이 필요한 값들*/
        private double averageChallengeSuccessRate;

        //현재 챌린지 성공률
        private double currentUserSuccessRate;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime created_at;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime updated_at;

        //참여중인 멤버 리스트
        private Set<MemberChallengeResponseDto> participatingMember;
        //이미지 중 챌린지 생성자가 추가할 사진 필드
        private String challengeRepImagePath;

        private List<String> challengeExamImagePath;

        private List<ChallengeCertImageResponseDto> challengeCertImages;

        //챌린지 댓글 리스트
        private List<ChallengeTalkDto.response> challengeTalks;

        private List<ChallengeReviewDto.Response> challengeReviews;

        private Boolean isSimpleResponse;

    }

    /**
     * 챌린지 참가자에 대한 정보를 선별해주는 dto
     */
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberChallengeResponseDto {
        private Long memberChallengeId;
        private Long challengeId;
        private Long memberId;
        private String participatingMemberName;
        private Member.MemberBadge memberBadge;
        private int memberSuccessDay;
        private double memberChallengeSuccessRate;
    }

    /**
     * 인증사진을 리스트로 바꿔줄 dto
     */
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChallengeCertImageResponseDto {
        private Long memberId;
        private String imagePath;
    }


    @Getter
    @AllArgsConstructor
    public static class ChallengeTitleResponse{
        private String challengeTitle;
    }

}
