package be.wiselife.challenge.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }


    public Challenge createChallenge(Challenge challenge){

        return saveChallenge(challenge);
    }

    public Challenge patchChallenge(Challenge challenge){
        Challenge savedChallenge = challengeRepository.findById(challenge.getChallengeId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));

    }

    private Challenge saveChallenge(Challenge challenge){
        return challengeRepository.save(challenge);
    }
}
