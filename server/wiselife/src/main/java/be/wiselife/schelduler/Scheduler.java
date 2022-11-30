package be.wiselife.schelduler;

import be.wiselife.challenge.service.ChallengeService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class Scheduler {
    private final ChallengeService challengeService;

    public Scheduler(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }



    /**
     * 매 00시 00분마다 챌린지 종료 status update
     */
    @Scheduled(cron = "* 0/1 * * * *")
    public void checkChallengeIsClosed(){
        challengeService.updateChallengeIsClosedStatus();
    }

    /**
     * 매 03시 00분마다 챌린지 성공률 + 챌린지 상금 + 환급예정금액 update
     */
    @Scheduled(cron = "0 0 3 * * *")
    public void updateChallengeReward(){
        challengeService.updateChallengeSuccessRate();
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded();
    }
}
