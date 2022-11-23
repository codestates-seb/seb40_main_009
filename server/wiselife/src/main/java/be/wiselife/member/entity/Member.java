package be.wiselife.member.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.order.entity.Order;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
        this.memberBadge = MemberBadge.새내기; //구현필요
        this.followStatus=FollowStatus.UNFOLLOW;
        this.memberLevel = 1;
        this.hasRedCard = false;
        this.memberChallengeTotalObjCount = 0;
        this.memberExp = 0;
        this.memberChallengePercentage = memberExp/memberChallengeTotalObjCount;
        this.memberMoney = 0;
        this.followers = 0;
        this.memberDescription = "안녕하세요! 슬린이에요^^";
        this.memberImagePath = memberImagePath;
        this.refreshToken = RefreshToken;
    }
    //더미 데이터용 생성자
    @Builder
    public Member(String memberEmail, String memberImagePath, List<String> roles, String provider,
                  String providerId,int followerCount,MemberBadge memberBadge,int memberLevel,String memberName,double memberExp) {

        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
        this.memberEmail = memberEmail;
        this.memberImagePath = memberImagePath;

        this.memberName = memberName; //네 구현필요
        this.memberBadge = memberBadge; //구현필요
        this.followStatus=FollowStatus.UNFOLLOW;
        this.memberLevel = memberLevel;
        this.hasRedCard = false;
        this.memberChallengeTotalObjCount = 0;
        this.memberExp = memberExp;
        this.memberChallengePercentage = memberExp/memberChallengeTotalObjCount;
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

    @Column(nullable = false)
    private boolean hasRedCard;

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
    @Column(nullable = false)
    private double memberMoney;
    public void addOrder(Order order) {
        orders.add(order);
    }

    /**
     * 참여중, 참여했던 챌린지에 대한 필드에 대한 값
     * memberChallenges : 참여중인 챌린지에 대한 정보를 가져온다.
     * memberChallengeTotalObjCount : 멤버가 참여중, 참여했던 챌린지의 총 목표참가일수
     * memberExp : 멤버가 인증한 횟수를 의미하며, 뱃지와 레벨 변화에 기준이 된다. -> 하루에 3번 인증하면 3이 증가한다.
     * memberBadge : 경험치에 따라 변화될 값
     * memberLevel : 경험치에 따라 변화될 값
     * memberChallengePercentage : 멤버가 인증한 총 횟수 / 총 참여한 챌린지가 요구하는 목표 일수
     */
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MemberChallenge> memberChallenges = new ArrayList<>();

    @Column(nullable = false)
    private double memberChallengeTotalObjCount;

    @Column(nullable = false)
    private double memberExp;

    @Enumerated(EnumType.STRING)
    private MemberBadge memberBadge;

    @Column(nullable = false)
    private int memberLevel;

    @Column(nullable = false)
    private double memberChallengePercentage;

    @Column(columnDefinition = "VARCHAR(1000)")
    private String refreshToken;

    public enum FollowStatus {
        SELF, FOLLOW, UNFOLLOW,
        ;
    }

    public enum MemberBadge {
        새내기(1,1), // 2 -> 좀치는도전자
        좀치는도전자(2,3),//4-> 열정도전자
        열정도전자(3,7),//8-> 모범도전자
        모범도전자(4,15),//16-> 우수도전자
        우수도전자(5,31),//16-> 챌린지 장인
        챌린지장인(6,63),//32-> 시간의 지배자
        시간의지배자(7,127),//64-> 챌린지 신
        챌린지신(8); //128 -> 만렙

        @Getter
        public int level;
        @Getter
        public double objExperience;

        MemberBadge(int level) {
            this.level = level;
        }

        MemberBadge(int level, double objExperience) {
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
