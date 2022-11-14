package be.wiselife.challenge.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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

    private Challenge saveChallenge(Challenge challenge){
        return challengeRepository.save(challenge);
    }
}
