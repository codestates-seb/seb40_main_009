package be.wiselife.member.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.management.relation.Role;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name="Member_Table")
//Member는 생성일자만 있으면 되므로 TimeAudit만 상속 받는다.
public class Member extends TimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String memberDescription = "안녕하세요! 슬린이에요^^";

    @Builder
    public Member(String memberEmail, String memberImage, List<String> roles, String provider, String providerId) {

        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
        this.memberEmail = memberEmail;
        this.memberImage = memberImage;

        this.memberName = "임의값"; //네 구현필요
        this.memberExp = 0;
        this.memberBadge = null; //구현필요
        this.memberLevel = 1;
        this.hasRedCard = false;
        this.memberChallengeTotalCount = 0;
        this.memberChallengeSuccessCount = 0;
        this.memberChallengePercentage = 0;
        this.memberMoney = 0;
        this.followers = 0;
        this.memberDescription = "안녕하세요! 슬린이에요^^";
    }

    //로그인 기능 추가뒤에 로그인 멤버의 토큰에서 이메일값 가져올 예정
    @Column(nullable = false, unique = true)
    private String memberEmail;

    /**
     * 로그인 기능이 추가되어도 로그인 멤버의 토큰에서 가져오지 않으며
     * 생성시에 uuid를 통한 기본값 배정이며,
     * 멤버가 수정시 원하는 값 입력 가능하나, 중복되는 memberName 없이 유효성 동작
     */
    @Column(nullable = false, unique = true)
    private String memberName;

    /**
     * 연관관계 매핑이 필요한 필드
     * 참여중인 챌린지가 없으므로 생성시 기본값 0건, 0원, 이미지는 image
     */

    @Column
    private int memberExp = 0;

    @Enumerated(EnumType.STRING)
    private MemberBadge memberBadge = MemberBadge.IRON;


    private int memberLevel = 1;

    @Column
    private boolean hasRedCard;

    // 아래는 매핑 후에도 ResponseDTO에서 처리 가능한 필드

    @Column
    private int memberChallengeTotalCount=0;

    @Column
    private int memberChallengeSuccessCount=0;

    @Column
    private double memberChallengePercentage=0;

    @Column
    private double memberMoney=0;

    @Column
    private String memberImage = "image";

    @Column
    private int followers = 0;

    @Column
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    private String provider; // 플랫폼 이름 저장하기 추후 소셜 로그인을 한다면....?
    @Column
    private String providerId; // 플랫폼 아이디 값 저장하기 소셜 로그인에서 준 ID 번호

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
        public int level;

        MemberBadge(int level) {
            this.level = level;
        }

        public static MemberBadge badgeOfLevel(int level) {
            switch (level) {
                case 1:return IRON;
                case 2:return SILVER;
                case 3:return GOLD;
                case 4:return PLATINUM;
                case 5:return DIAMOND;
                case 6:return MASTER;
                case 7:return CHALLENGE;
                default:throw new BusinessLogicException(ExceptionCode.NO_MORE_HIGH_GRADE);
            }
        }
    }

}
