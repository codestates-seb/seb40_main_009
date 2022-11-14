package be.wiselife.member.dto;

import be.wiselife.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.Column;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "닉네임은 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
        private String memberName;

        private String memberDescription;

        private String memberImage;

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
        private int memberChallengeTotalCount;
        private int memberChallengeSuccessCount;
        private double memberChallengePercentage;
        private double memberMoney;
        private String memberImage;
        private int followers;

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
        private int followers;
        private LocalDateTime created_at;
    }
}
