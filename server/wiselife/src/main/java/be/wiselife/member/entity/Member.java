package be.wiselife.member.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.order.entity.Order;

import lombok.*;


import javax.persistence.*;
import java.util.*;


@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name="Member_Table")
//Member는 생성일자만 있으면 되므로 TimeAudit만 상속 받는다.
public class Member extends TimeAudit {

    @Builder
    public Member(String memberEmail, String memberImagePath, List<String> roles, String provider, String providerId, String RefreshToken) {

        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
        this.memberEmail = memberEmail;
        this.memberImagePath = memberImagePath;

        this.memberName = createRandomId(); //네 구현필요
        this.memberExp = 0;
        this.memberBadge = MemberBadge.새내기; //구현필요
        this.followStatus=FollowStatus.UNFOLLOW;
        this.memberLevel = 1;
        this.hasRedCard = false;
        this.memberChallengeTryCount = 0;
        this.memberChallengeSuccessCount = 0;
        this.memberChallengePercentage = memberChallengeSuccessCount/memberChallengeTryCount;
        this.memberMoney = 0;
        this.followers = 0;
        this.memberDescription = "안녕하세요! 슬린이에요^^";
        this.memberImagePath = memberImagePath;
        this.refreshToken = RefreshToken;
    }
    //더미 데이터용 생성자
    @Builder
    public Member(String memberEmail, String memberImagePath, List<String> roles, String provider,
                  String providerId,int followerCount,MemberBadge memberBadge,String memberName) {

        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
        this.memberEmail = memberEmail;
        this.memberImagePath = memberImagePath;

        this.memberName = createRandomId(); //네 구현필요
        this.memberExp = 0;
        this.memberBadge = memberBadge; //구현필요
        this.followStatus=FollowStatus.UNFOLLOW;
        this.memberLevel = 1;
        this.hasRedCard = false;
        this.memberChallengeTryCount = 0;
        this.memberChallengeSuccessCount = 0;
        this.memberChallengePercentage = memberChallengeSuccessCount/memberChallengeTryCount;
        this.memberMoney = 0;
        this.followers = 0;
        this.followerCount = followerCount;
        this.memberDescription = "안녕하세요! 슬린이에요^^";
        this.memberImagePath = memberImagePath;
        this.refreshToken = "리프레쉬토큰";
        this.memberName = memberName;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column
    private String memberDescription = "안녕하세요! 슬린이에요^^";

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
    private int memberExp;

    @Enumerated(EnumType.STRING)
    private MemberBadge memberBadge;

    @Column(nullable = false)
    private int memberLevel;

    @Column(nullable = false)
    private boolean hasRedCard;

    @Column(nullable = false)
    private double memberMoney;

    //이 필드는 팔로우 하트의 음영 처리를 위해 필요한 필드

    @OneToMany(mappedBy = "following", cascade = CascadeType.PERSIST)
    private Set<Follow> follows = new HashSet<>();
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FollowStatus followStatus=FollowStatus.UNFOLLOW;

    @Column(nullable = false)
    private int followerCount;

    @Column(nullable = false)
    private int followers;

    // 소셜로그인 관련 필드
    @Column(nullable = false)
    private String provider; // 플랫폼 이름 저장하기 추후 소셜 로그인을 한다면....?
    @Column(nullable = false)
    private String providerId; // 플랫폼 아이디 값 저장하기 소셜 로그인에서 준 ID 번호

    @Column(nullable = false)
    private String memberImagePath="이미지";

    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    // 주문내역 관련 필드
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    public void addOrder(Order order) {
        orders.add(order);
    }



    // 참여중, 참여했던 챌린지에 대한 필드
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<MemberChallenge> memberChallenges = new ArrayList<>();

    // TODO: 응답할때는 소수점 없이 보여주기 위해서 Dto에서 Math.round()를 사용하자
    @Column(nullable = false)
    private double memberChallengeTryCount;

    // TODO: 응답할때는 소수점 없이 보여주기 위해서 Dto에서 Math.round()를 사용하자
    @Column(nullable = false)
    private double memberChallengeSuccessCount;

    // TODO: 필드를 두지 않고 DTO로 응답하게 수정하자
    @Column(nullable = false)
    private double memberChallengePercentage;

    @Column(columnDefinition = "VARCHAR(1000)")
    private String refreshToken;

    public enum FollowStatus {
        SELF, FOLLOW, UNFOLLOW,
        ;
    }

    public enum MemberBadge {
        새내기(1,0),
        좀치는도전자(2,Math.pow(2,1)),
        열정도전자(3,Math.pow(2,2)),
        모범도전자(4,Math.pow(2,3)),
        우수도전자(5,Math.pow(2,4)),
        챌린지장인(6,Math.pow(2,5)),
        시간의지배자(7,Math.pow(2,6)),
        챌린지신(8,Math.pow(2,7));

        @Getter
        public int level;
        @Getter
        public double objExperience;

        MemberBadge(int level,double objExperience) {
            this.level = level;
            this.objExperience = objExperience;
        }

        public static MemberBadge badgeOfLevel(int level) {
            switch (level) {
                case 1:return 새내기;
                case 2:return 좀치는도전자;
                case 3:return 열정도전자;
                case 4:return 모범도전자;
                case 5:return 우수도전자;
                case 6:return 챌린지장인;
                case 7:return 시간의지배자;
                case 8:return 챌린지신;
                default:throw new BusinessLogicException(ExceptionCode.NO_MORE_HIGH_GRADE);
            }
        }
    }
    /**
     * 생성자는 필요시 작성예정
     */
    public void setFollows(Set<Follow> follows) {
        this.follows = follows;
    }

    // 랜덤 아이디 생성기
    public String createRandomId() {
        String random = UUID.randomUUID().toString().substring(0, 6);
        return "챌린저" + random;
    }

}
