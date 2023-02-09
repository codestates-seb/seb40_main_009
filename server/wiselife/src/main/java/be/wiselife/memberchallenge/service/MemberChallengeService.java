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
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;

import static java.lang.Thread.sleep;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class MemberChallengeService {
    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    /**
     * Challenge를 생성 할때 사용되는 메서드
     * 역할 1. 생성 시점의 챌린지 참여인원 증가
     * 역할 2. 생성 시점의 예상 멤버가 가져갈 예상 상금 계산, 챌린지에 모인 총상금 계산
     */

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Challenge plusMemberAndChallenge(Challenge challenge, Member member) throws InterruptedException {
        log.info("plusMemberAndChallenge tx start");

        if (member.getMemberMoney() < challenge.getChallengeFeePerPerson()) {
            throw new BusinessLogicException(ExceptionCode.YOU_NEED_TO_CHARGE_MONEY);
        }
        double challengeCurrentParty = challenge.getChallengeCurrentParty();
        MemberChallenge memberChallenge = new MemberChallenge();
        try {
            challenge.setChallengeCurrentParty(challengeCurrentParty+1);
            sleep(5000);
        } catch (Exception e) {
            throw e;
        }

        if (challenge.getChallengeCurrentParty() > challenge.getChallengeMaxParty()) {
            throw new BusinessLogicException(ExceptionCode.THIS_CHALLENGE_HAS_MAX_MEMBER);
        }

        memberChallenge.setExpectedRefundToMember(challenge.getChallengeFeePerPerson());
        memberChallenge.setMember(member);
        memberChallenge.setChallenge(challenge);

        challenge.getMemberChallenges().add(memberChallenge);
        challenge.setChallengeTotalReward(challenge.getChallengeTotalReward()+challenge.getChallengeFeePerPerson());
        member.getMemberChallenges().add(memberChallenge);
        member.setMemberMoney(member.getMemberMoney()-challenge.getChallengeFeePerPerson());
        memberChallengeRepository.save(memberChallenge);
        memberRepository.save(member);
        log.info("plusMemberAndChallenge tx end");
//        try {
//            sleep(5000);
            return challengeRepository.save(challenge);
//        } catch (Exception e) {
//            throw e;
//        }

    }


    /**
     * Challenge를 참여취소를 할때 사용되는 메서드
     * 역할 1. 취소 시점의 챌린지 참여인원 감소
     * 역할 2. 취소 시점의 예상 멤버가 가져갈 예상 상금 계산, 챌린지에 모인 총상금 계산
     */
    public Challenge minusMemberAndChallenge(Challenge challenge, Member member) {
        log.info("patchMemberAndChallenge tx start");

        double challengeCurrentParty = challenge.getChallengeCurrentParty();
        if (memberChallengeRepository.findByChallengeIdAndMember(challenge.getRandomIdForImage(), member) != null) {
            MemberChallenge memberChallengeFromRepository = memberChallengeRepository.findByChallengeAndMember(challenge, member);

            challenge.setChallengeCurrentParty(challengeCurrentParty-1);
            challenge.setChallengeTotalReward((int)Math.round(challenge.getChallengeCurrentParty()*challenge.getChallengeFeePerPerson()));
            member.setMemberMoney(member.getMemberMoney()+challenge.getChallengeFeePerPerson());
            challenge.getMemberChallenges().remove(memberChallengeFromRepository);
            member.getMemberChallenges().remove(memberChallengeFromRepository);

            memberChallengeRepository.delete(memberChallengeFromRepository);
            memberRepository.save(member);
            log.info("patchMemberAndChallenge tx end");
            return challengeRepository.save(challenge);

        } else {
            throw new BusinessLogicException(ExceptionCode.YOU_ALREADY_UNPARTICIPATED);
        }
    }

    public void updateMemberChallengeExpectedRefund(Challenge challenge, double challengeProgressRate){
        log.info("updateMemberChallengeExpectedRefund tx start");
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
        log.info("updateMemberChallengeExpectedRefund tx end");
    }

    @Transactional(readOnly = true)
    public MemberChallenge findMemberChallengeByMemberAndChallenge(Challenge challenge, Member member){
        log.info("findMemberChallengeByMemberAndChallenge tx start");
        log.info("findMemberChallengeByMemberAndChallenge tx end");
        return memberChallengeRepository.findByChallengeAndMember(challenge, member);
    }
}
