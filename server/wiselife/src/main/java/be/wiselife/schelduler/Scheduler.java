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
     * 매 00시 00분마다 챌린지 성공률 update
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void checkChallengeSuccessRate(){
        challengeService.updateChallengeSuccessRate();
    }

    /**
     * 매 00시 10분마다 챌린지 종료 status update
     */
    @Scheduled(cron = "0 10 0 * * *")
    public void checkChallengeIsClosed(){
        challengeService.updateChallengeIsClosedStatus();
    }
}
