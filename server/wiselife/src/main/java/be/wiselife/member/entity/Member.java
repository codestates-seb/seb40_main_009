package be.wiselife.member.entity;

import be.wiselife.audit.TimeAudit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="Member_Table")
//Member는 생성일자만 있으면 되므로 TimeAudit만 상속 받는다.
public class Member extends TimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String memberDescription = "안녕하세요! 슬린이에요^^";

    //로그인 기능 추가뒤에 로그인 멤버의 토큰에서 이메일값 가져올 예정
    @Column(nullable = false,unique = true)
    private String memberEmail;

    /**
     * 로그인 기능이 추가되어도 로그인 멤버의 토큰에서 가져오지 않으며
     * 생성시에 uuid를 통한 기본값 배정이며,
     * 멤버가 수정시 원하는 값 입력 가능하나, 중복되는 memberName 없이 유효성 동작
     */
    @Column(nullable = false,unique = true)
    private String memberName;

    /**
     * 연관관계 매핑이 필요한 필드
     * 참여중인 챌린지가 없으므로 생성시 기본값 0건, 0원, 이미지는 image
     */

    @Column(nullable = false)
    private int memberExp=0;

    @Enumerated(EnumType.STRING)
    private MemberBadge memberBadge = MemberBadge.IRON;

    @Column(nullable = false)
    private boolean hasRedCard = false;

    // 아래는 매핑 후에도 ResponseDTO에서 처리 가능한 필드

    @Column(nullable = false)
    private int memberChallengeTotalCount=0;

    @Column(nullable = false)
    private int memberChallengeSuccessCount=0;

    @Column(nullable = false)
    private double memberChallengePercentage=0;

    @Column(nullable = false)
    private double memberMoney=0;

    @Column(nullable = false)
    private String memberImage = "image";

    @Column(nullable = false)
    private int followers = 0;



    /**
     * 연관관계 매핑 해야할것
     * voter, image, challenge, challengeReview
     */


    /**
     * 생성자는 필요시 작성예정
     */

    public enum MemberBadge {
        // 레벨로 나타내면 몇이 최대인지 몰라서 우선 롤 계급제로 분류
        IRON(1),
        SILVER(2),
        GOLD(3),
        PLATINUM(4),
        DIAMOND(5),
        MASTER(6),
        CHALLENGE(7);

        @Getter
        private int level;

        MemberBadge(int level) {
            this.level = level;
        }
    }

}
