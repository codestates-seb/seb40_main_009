package be.wiselife.member.dto;

import be.wiselife.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
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
        
        private String memberName;

        private String memberDescription;


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
        private double memberChallengePercentage;
        private double memberMoney;
        private String memberImagePath;
        private int followerCount;
        private List<MemberFollowerResponseDto> followers;
        private Member.FollowStatus followStatus;
        private List<MemberChallengeResponseDto> participatingChallenges;
        private List<MemberChallengeResponseDto> endChallenges;

        //멤버 페이지에서 다음 레벨까지 남은 퍼센트를 나타냄
        private double memberExpObjRate;

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
        private String memberImagePath;
        private String memberName;
        private Member.MemberBadge memberBadge;
        private int followerCount;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
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
        private String challengeRepImage;
        private long objDay;
        private double memberChallengeSuccessRate;
        private double memberReward;
        private boolean isClosed;
    }
}
