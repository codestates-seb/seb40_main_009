package be.wiselife.challenge.dto;

import be.wiselife.challenge.entity.Challenge;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
public class ChallengePostDto {

    private String challengeCategory;

    @NotNull
    private String challengeTitle;

    private String challengeDescription;

    private int challengeCurrentParty;

    private int challengeMaxParty;

    private int challengeMinParty;

    private LocalDate challengeStartDate;

    private LocalDate challengeEndDate;

    private String challengeAuthDescription;

    private int challengeAuthCycle;

    private int challengeFeePerPerson; //인당 참여금액

    private int challengeTotalReward; // 현재까지의 전체 상금

    private int challengeViewCount;

}
