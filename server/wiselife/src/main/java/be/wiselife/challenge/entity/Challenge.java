package be.wiselife.challenge.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.audit.WriterAudit;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.image.entity.ChallengeCertImage;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Entity
public class Challenge extends WriterAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    @Column(nullable = false)
    @Setter
    private ChallengeCategory challengeCategory;

    @Column(nullable = false)
    @Setter
    private String challengeTitle;

    @Column(nullable = false)
    @Setter
    private String challengeDescription;

    @Setter
    private double challengeCurrentParty;
    @Setter
    private int challengeMaxParty;
    @Setter
    private int challengeMinParty;

    @Column(nullable = false)
    @Setter
    private LocalDate challengeStartDate;

    @Column(nullable = false)
    @Setter
    private LocalDate challengeEndDate;

    @Column(nullable = false,columnDefinition = "VARCHAR(1000)")
    @Setter
    private String challengeAuthDescription;
    @Column(nullable = false)
    @Setter
    private int challengeAuthCycle; //인증 빈도

    private String challengeDirectLink;//이건 프런트가 해야하지 않나?? ㅇㅈ
    @Setter
    private int challengeFeePerPerson; //인당 참여금액
    @Setter
    private double challengeTotalReward; // 현재까지의 전체 상금
    @Setter
    private int challengeViewCount;
    @Setter
    private Boolean isClosed;

    @Setter
    private double challengeSuccessRate;

    //이미지 중 챌린지 생성자가 추가할 사진 필드
    @Setter
    private String challengeRepImagePath;

    @Setter
    @Column(columnDefinition = "VARCHAR(1000)")
    private String challengeExamImagePath;

    //이미지 중 챌린지 참여자가 추가할 사진 필드
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<ChallengeCertImage> challengeCertImages = new ArrayList<>();
    @Setter
    private String challengeCertImagePath;

    //챌린지 생성시 challengeId를 받아 올수 없기때문에 대체용으로 사용
    @Setter
    private String randomIdForImage;

    @Setter
    private double challengeSuccessCount=0;

    //챌린지 수정, 삭제시 권한 보유한 member의 id
    @Setter
    @Getter
    private Long authorizedMemberId;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private List<ChallengeTalk> challengeTalkList = new ArrayList<>();

    //챌린지 진행 현황 관련 필드
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private List<MemberChallenge> memberChallenges = new ArrayList<>();

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.REMOVE)
    @ToString.Exclude
    private List<ChallengeReview> challengeReviewList = new ArrayList<>();

    @ElementCollection
    @Getter
    @Setter
    private List<String> challengeAuthAvailableTime = new ArrayList<>();

    @Builder
    public Challenge(Long challengeId, ChallengeCategory challengeCategory, String challengeTitle,
                     String challengeDescription, int challengeMaxParty, int challengeMinParty,
                     LocalDate challengeStartDate, LocalDate challengeEndDate,
                     String challengeAuthDescription, int challengeAuthCycle, int challengeFeePerPerson,
                     String challengeRepImagePath, String challengeExamImagePath, String challengeCertImagePath, List<String> challengeAuthAvailableTime) {
        this.challengeId = challengeId;
        this.challengeCategory = challengeCategory;
        this.challengeTitle = challengeTitle;
        this.challengeDescription = challengeDescription;
        this.challengeMaxParty = challengeMaxParty;
        this.challengeMinParty = challengeMinParty;
        this.challengeStartDate = challengeStartDate;
        this.challengeEndDate = challengeEndDate;
        this.challengeAuthDescription = challengeAuthDescription;
        this.challengeAuthCycle = challengeAuthCycle;
        this.challengeAuthAvailableTime = challengeAuthAvailableTime;
        this.challengeFeePerPerson = challengeFeePerPerson;

        /*인자로 받지는 않지만 default값 설정해야 하는 것들*/
        this.isClosed = false;
        this.challengeViewCount = 0;
        this.challengeCurrentParty = 0;
        this.challengeTotalReward = 0;

        this.challengeRepImagePath=challengeRepImagePath;
        this.challengeExamImagePath = challengeExamImagePath;
        this.randomIdForImage = UUID.randomUUID().toString().substring(0, 6);

        this.challengeCertImagePath = challengeCertImagePath;
    }

    /**
     * 챌린지 댓글 추가
     */
    public void addChallengeTalk(ChallengeTalk challengeTalk){
        this.challengeTalkList.add(challengeTalk);
        if(challengeTalk.getChallenge() == null){
            challengeTalk.setChallenge(this);
        }
    }

    /**
     * 챌린지 리뷰 추가
     */
    public void addChallengeReview(ChallengeReview challengeReview){
        this.challengeReviewList.add(challengeReview);
        if(challengeReview.getChallenge() == null){
            challengeReview.setChallenge(this);
        }
    }

    public enum ChallengeCategory {
        /**
         * ChallengeCategoryId
         * 1 = BUCKET_LIST,
         * 2 = SHARE_CHALLENGE,
         * 3 = OFFLINE_CHALLENGE */
        BUCKET_LIST("버킷 리스트"),
        SHARED_CHALLENGE("공유 챌린지"),
        OFFLINE_CHALLENGE("오프라인 챌린지");

        @Getter
        private String category;

        ChallengeCategory(String category) {
            this.category = category;
        }
    }
}
