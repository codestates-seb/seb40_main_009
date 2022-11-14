package be.wiselife.challenge.dto;

import be.wiselife.challenge.entity.Challenge;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class ChallengeResponseDto {

    private Long challengeId;

    private Challenge.ChallengeCategory challengeCategory;

    private String challengeTitle;

    private String challengeDescription;

    private int challengeCurrentParty;

    private int challengeMaxParty;

    private int challengeMinParty;

    private LocalDate challengeStartDate;

    private LocalDate challengeEndDate;

    private String challengeAuthDescription;

    private int challengeAuthCycle;

    private String challengeDirectLink;//이건 프런트가 해야하지 않나??

    private int challengeFeePerPerson; //인당 참여금액

    private int challengeTotalReward; // 현재까지의 전체 상금

    private int challengeViewCount;

    private Boolean isClosed;

    /*별도로 계산해야 하는 값들*/
//    private int 챌린지 평균 성공률
//    private int 접속하고 있는 유저의 성공률(이 챌린지에 참여중이라면)
}
