package be.wiselife.challenge.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Entity
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeId;

    @Column(nullable = false)
    private ChallengeCategory challengeCategory;

    @Column(nullable = false)
    private String challengeTitle;

    @Column(nullable = false)
    private String challengeDescription;

    private int challengeCurrentParty;

    private int challengeMaxParty;

    private int challengeMinParty;

    @Column(nullable = false)
    private LocalDate challengeStartDate;

    @Column(nullable = false)
    private LocalDate challengeEndDate;

    @Column(nullable = false)
    private String challengeAuthDescription;

    @Column(nullable = false)
    private int challengeAuthCycle; //인증 빈도

    private String challengeDirectLink;//이건 프런트가 해야하지 않나??

    private int challengeFeePerPerson; //인당 참여금액

    private int challengeTotalReward; // 현재까지의 전체 상금

    private int challengeViewCount;

    private Boolean isClosed;


    @Builder
    public Challenge(ChallengeCategory challengeCategory, String challengeTitle, String challengeDescription, int challengeMaxParty, int challengeMinParty, int challengeCurrentParty, LocalDate challengeStartDate, LocalDate challengeEndDate, String challengeAuthDescription, int challengeAuthCycle, int challengeFeePerPerson) {
        this.challengeCategory = challengeCategory;
        this.challengeTitle = challengeTitle;
        this.challengeDescription = challengeDescription;
        this.challengeMaxParty = challengeMaxParty;
        this.challengeMinParty = challengeMinParty;
        this.challengeStartDate = challengeStartDate;
        this.challengeEndDate = challengeEndDate;
        this.challengeAuthDescription = challengeAuthDescription;
        this.challengeAuthCycle = challengeAuthCycle;
        this.challengeFeePerPerson = challengeFeePerPerson;

        /*인자로 받지는 않지만 default값 설정해야 하는 것들*/
        this.isClosed = false;
        this.challengeViewCount = 0;
        this.challengeCurrentParty = 0;
        this.challengeTotalReward = 0;
    }




    public enum ChallengeCategory {
        BUCKET_LIST("버킷 리스트"),
        SHARED_CHALLENGE("공유 챌린지"),
        OFFLINE_CHALLENGE("오프라인 챌린지");

        @Getter
        private String category;

        ChallengeCategory(String category) {
            this.category = category;
        }

        @JsonCreator
        public static ChallengeCategory stringToJson(String s){
            return ChallengeCategory.valueOf(s);
        }
    }
}
