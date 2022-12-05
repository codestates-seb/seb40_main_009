package be.wiselife.schelduler;

import be.wiselife.challenge.service.ChallengeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Service
public class Scheduler {
    private final ChallengeService challengeService;

    public Scheduler(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }



    /**
     * 매 00시 10분마다 챌린지 종료 status update 밤에 하니까 밤마다 하즈아
     */
    @Async
    @Scheduled(cron = "0 10 0 * * *")
    public void scheduleCheckChallengeIsClosed(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================CHECK IF CHALLENGE IS CLOSED START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeIsClosedStatus();
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================CHECK IF CHALLENGE IS CLOSED END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }

    /**
     * 매 10분마다 챌린지 성공률 + 챌린지 상금 + 환급예정금액 update
     */
    @Async
    @Scheduled(cron = "0 0/10 * * * *")
    public void scheduleUpdateChallengeReward1(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate(5,1);
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded(5,1);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================UPDATE CHALLENGE REWARD END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }

    @Async
    @Scheduled(cron = "0 0/10 * * * *")
    public void scheduleUpdateChallengeReward2(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate(5,2);
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded(5,2);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================UPDATE CHALLENGE REWARD END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }

    @Async
    @Scheduled(cron = "0 0/10 * * * *")
    public void scheduleUpdateChallengeReward3(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate(5,3);
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded(5,3);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================UPDATE CHALLENGE REWARD END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }

    @Async
    @Scheduled(cron = "0 0/10 * * * *")
    public void scheduleUpdateChallengeReward4(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate(5,4);
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded(5,4);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================UPDATE CHALLENGE REWARD END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }

    @Async
    @Scheduled(cron = "0 0/10 * * * *")
    public void scheduleUpdateChallengeReward5(){
        LocalDateTime start = LocalDateTime.now();
        log.info("==================UPDATE CHALLENGE REWARD START==================");
        log.info("==================Current Thread: {}==================", Thread.currentThread().getName());
        challengeService.updateChallengeSuccessRate(5,5);
        challengeService.updateChallengeTotalRewardAndMemberChallengeToBeRefunded(5,5);
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        log.info("==================UPDATE CHALLENGE REWARD END==================");
        log.info("==================걸린 시간: {}==================", duration.toSeconds());
    }
}
