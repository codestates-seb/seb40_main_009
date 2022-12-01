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

    @Scheduled(cron = "0 0 3 * * *")
    public void scheduleCheckChallengeIsClosed(){
        log.info("==================CHECK IF CHALLENGE IS CLOSED START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeIsClosedStatus();

        log.info("==================CHECK IF CHALLENGE IS CLOSED END==================");
    }

    /**
     * 매 03시 00분마다 챌린지 성공률 + 챌린지 상금 + 환급예정금액 update
     */
    @Scheduled(cron = "0 0 3 * * *")
    public void scheduleUpdateChallengeReward(){
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate();
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded();
        log.info("==================UPDATE CHALLENGE REWARD END==================");
    }
}
