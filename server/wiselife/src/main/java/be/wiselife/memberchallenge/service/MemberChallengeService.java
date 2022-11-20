package be.wiselife.memberchallenge.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberChallengeService {
    private final MemberChallengeRepository memberChallengeRepository;

    private final MemberRepository memberRepository;

    private final ChallengeRepository challengeRepository;

    /**
     * Challenge를 생성하거나 참여할때 사용되는 메서드
     * 역할 1. 챌린지 참여인원 증가
     * 역할 2. 참여 시점의 예상 멤버가 가져갈 예상 상금 계산
     */
    public Challenge postMemberAndChallenge(Challenge challenge, Member member) {
        MemberChallenge memberChallenge = new MemberChallenge();

        if (memberChallengeRepository.findByChallengeIdAndMember(challenge.getRandomIdForImage(),member)!=null) {
            throw new BusinessLogicException(ExceptionCode.YOU_ALREADY_PARTICIPATE);
        }

        double challengeCurrentParty = challenge.getChallengeCurrentParty()+1;
        double memberChallengeTryCount = member.getMemberChallengeTryCount()+1;

        challenge.setChallengeCurrentParty(challengeCurrentParty);
        challenge.setChallengeTotalReward((int)Math.round(challengeCurrentParty*challenge.getChallengeFeePerPerson()));
        member.setMemberChallengeTryCount(memberChallengeTryCount);

        memberChallenge.setMemberReward(challenge.getChallengeFeePerPerson());
        memberChallenge.setMember(member);
        memberChallenge.setChallenge(challenge);

        challenge.getMemberChallenges().add(memberChallenge);
        member.getMemberChallenges().add(memberChallenge);



        memberChallengeRepository.save(memberChallenge);
        memberRepository.save(member);

        return challengeRepository.save(challenge);
    }
}
