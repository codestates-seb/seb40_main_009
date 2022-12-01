package be.wiselife.schelduler;

import be.wiselife.challenge.service.ChallengeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class Scheduler {
    private final ChallengeService challengeService;

    public Scheduler(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }



    /**
     * 매 00시 00분마다 챌린지 종료 status update
     */

    @Scheduled(cron = "0/30 * * * * *")
    public void checkChallengeIsClosed(){
        challengeService.updateChallengeIsClosedStatus();
        log.trace("Hi I'm {} log", "TRACE");
        log.debug("Hi I'm {} log", "DEBUG");
        log.info("Hi I'm {} log", "INFO");
        log.warn("Hi I'm {} log", "WARN");
        log.error("Hi I'm {} log", "ERROR");
        log.info("Current Thread: {}", Thread.currentThread().getName());
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
