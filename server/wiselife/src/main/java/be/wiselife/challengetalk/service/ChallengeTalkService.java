package be.wiselife.challengetalk.service;

import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.challengetalk.repository.ChallengeTalkRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ChallengeTalkService {
    private final ChallengeTalkRepository challengeTalkRepository;
    private final MemberService memberService;
    private final ChallengeService challengeService;

    public ChallengeTalkService(ChallengeTalkRepository challengeTalkRepository, MemberService memberService, ChallengeService challengeService) {
        this.challengeTalkRepository = challengeTalkRepository;
        this.memberService = memberService;
        this.challengeService = challengeService;
    }

    public ChallengeTalk createChallengeTalk(ChallengeTalk challengeTalk, Long challengeId){
        challengeTalk.setChallenge(challengeService.getChallenge(challengeId));

        return saveChallengeTalk(challengeTalk);
    }

    public ChallengeTalk updateChallengeTalk(ChallengeTalk changedChallengeTalk, String tryingMemberEmail) {

        ChallengeTalk savedChallengeTalk = findChallengeTalkById(changedChallengeTalk.getChallengeTalkId());

        /*유저 권한 확인
        * 댓글 작성자 email & 수정 요청자 email 비교
        * */
        if(!memberService.isVerifiedMember(findChallengeTalkWriterEmail(savedChallengeTalk.getMemberId()), tryingMemberEmail)){
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN);
        }

        /*수정 로직*/
        Optional.ofNullable(changedChallengeTalk.getChallengeTalkBody())
                .ifPresent(savedChallengeTalk::setChallengeTalkBody);

        return saveChallengeTalk(savedChallengeTalk) ;
    }

    private ChallengeTalk saveChallengeTalk(ChallengeTalk challengeTalk){
        return challengeTalkRepository.save(challengeTalk);
    }

    public ChallengeTalk findChallengeTalkById(Long challengeTalkId){
        ChallengeTalk savedChallengeTalk =  challengeTalkRepository.findById(challengeTalkId).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_TALK_NOT_FOUND));

        return savedChallengeTalk;
    }

    /*챌린지 댓글 작성자의 email 찾는 함수*/
    private String findChallengeTalkWriterEmail(Long memberId){
        return memberService.findMemberById(memberId).getMemberEmail();
    }


    public void deleteChallengeTalk(Long challengeTalkId) {
        ChallengeTalk challengeTalk = findChallengeTalkById(challengeTalkId);
        challengeTalkRepository.delete(challengeTalk);
    }
}
