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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class MemberChallengeService {
    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    /**
     * Challenge를 생성하거나 참여, 참여취소를 할때 사용되는 메서드
     * 역할 1. 챌린지 참여인원 증가
     * 역할 2. 참여 시점의 예상 멤버가 가져갈 예상 상금, 챌린지에 모인 총상금 계산
     * 역할 3. 취소 시점의 챌린지 참여인원 감소
     * 역할 4. 취소 시점의 예상 멤버가 가져갈 예상 상금 계산, 챌린지에 모인 총상금 계산
     */
    public Challenge patchMemberAndChallenge(Challenge challenge, Member member) {

        double challengeCurrentParty = challenge.getChallengeCurrentParty();
        if (memberChallengeRepository.findByChallengeIdAndMember(challenge.getRandomIdForImage(), member) != null) {
            MemberChallenge memberChallengeFromRepository = memberChallengeRepository.findByChallengeAndMember(challenge, member);

            challenge.setChallengeCurrentParty(challengeCurrentParty-1);
            challenge.setChallengeTotalReward((int)Math.round(challengeCurrentParty*challenge.getChallengeFeePerPerson()));
            member.setMemberMoney(member.getMemberMoney()+challenge.getChallengeFeePerPerson());
            challenge.getMemberChallenges().remove(memberChallengeFromRepository);
            member.getMemberChallenges().remove(memberChallengeFromRepository);

            memberChallengeRepository.delete(memberChallengeFromRepository);
            memberRepository.save(member);

            return challengeRepository.save(challenge);

        } else {
            MemberChallenge memberChallenge = new MemberChallenge();

            challenge.setChallengeCurrentParty(challengeCurrentParty+1);
//            challenge.setChallengeTotalReward((int)Math.round(challengeCurrentParty*challenge.getChallengeFeePerPerson()));
            if (challenge.getChallengeCurrentParty() > challenge.getChallengeMaxParty()) {
                throw new BusinessLogicException(ExceptionCode.THIS_CHALLENGE_HAS_MAX_MEMBER);
            }
            memberChallenge.setExpectedRefundToMember(challenge.getChallengeFeePerPerson());
            memberChallenge.setMember(member);
            memberChallenge.setChallenge(challenge);

            challenge.getMemberChallenges().add(memberChallenge);
            member.getMemberChallenges().add(memberChallenge);

            memberChallengeRepository.save(memberChallenge);
            memberRepository.save(member);

            return challengeRepository.save(challenge);
        }
    }

    public void updateMemberChallengeExpectedRefund(Challenge challenge, double challengeProgressRate){
        List<MemberChallenge> memberChallengeList = challenge.getMemberChallenges();
        if(memberChallengeList == null) return ;

        int challengeFeePerPerson = challenge.getChallengeFeePerPerson();
        double challengeTotalReward = challenge.getChallengeTotalReward();
        int challengeParticipantsNum = memberChallengeList.size();

        for(MemberChallenge memberChallenge : memberChallengeList){
            //인당 참여금액 * 챌린지 진행률 * 해당 맴버의 인증 성공률 + 챌린지 전체 상금 / 참가 인원수
            memberChallenge.setExpectedRefundToMember(challengeFeePerPerson * challengeProgressRate * memberChallenge.getMemberChallengeSuccessRate()/100
                    + challengeTotalReward / challengeParticipantsNum);
        }

        memberChallengeRepository.saveAll(memberChallengeList);
    }

    @Transactional(readOnly = true)
    public MemberChallenge findMemberChallengeByMemberAndChallenge(Challenge challenge, Member member){
        return memberChallengeRepository.findByChallengeAndMember(challenge, member);
    }
}
