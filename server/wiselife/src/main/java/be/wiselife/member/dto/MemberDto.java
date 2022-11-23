package be.wiselife.member.dto;

import be.wiselife.member.entity.Member;
import lombok.*;


import javax.persistence.Column;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long memberId;

        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "닉네임은 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
        private String memberName;

        private String memberDescription;

        private String memberImagePath;

        //관리자일 경우 수정가능하게
        private boolean hasRedCard;

    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class detailResponse {
        private long memberId;
        private String memberDescription;
        private String memberEmail;
        private String memberName;
        private int memberExp=0;
        private Member.MemberBadge memberBadge;
        private boolean hasRedCard;
        private int memberChallengeTotalObjCount;
        private int memberChallengeSuccessCount;
        private double memberChallengePercentage;
        private double memberMoney;
        private String memberImagePath;
        private int followerCount;
        private List<MemberFollowerResponseDto> followers;
        private Member.FollowStatus followStatus;
        private List<MemberChallengeResponseDto> participatingChallenge;

        public void setHasRedCard(boolean hasRedCard) {
            this.hasRedCard = hasRedCard;
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class listResponse {
        private Long memberId;
        private String memberName;
        private Member.MemberBadge memberBadge;
        private int followerCount;
        private LocalDateTime created_at;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberFollowerResponseDto {
        private Long followId;
        private Long followingId;
        private Long followerId;
        private String followerName;
        private boolean followStatus;
    }
    /**
     * 참여한 챌린지에 대한 정보를 선별해주는 dto
     */
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberChallengeResponseDto {
        private Long memberChallengeId;
        private Long challengeId;
        private String challengeTitle;
        private int memberSuccessDay;
        private int objectPeriod;
        private double memberChallengeSuccessRate;
        private double memberReward;
        private boolean isClosed;
    }
}
