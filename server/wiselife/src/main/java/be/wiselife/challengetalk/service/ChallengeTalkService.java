package be.wiselife.challengetalk.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.challengetalk.repository.ChallengeTalkRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import org.springframework.stereotype.Service;

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

    public ChallengeTalk createChallengeTalk(ChallengeTalk challengeTalk, Long challengeId, Member loginMember){
        Challenge challenge = challengeService.getChallengeById(challengeId);

        challengeTalk.setChallenge(challenge);
        challengeTalk.setMemberId(loginMember.getMemberId());
        challengeTalk.setCreate_by_member(loginMember.getMemberName());

        challenge.addChallengeTalk(challengeTalk);

        return saveChallengeTalk(challengeTalk);
    }

    public ChallengeTalk updateChallengeTalk(ChallengeTalk changedChallengeTalk, Member loginMember) {
        //사용자 권한 확인
        ChallengeTalk savedChallengeTalk = findChallengeTalkById(changedChallengeTalk.getChallengeTalkId());
        checkUserAuthorization(savedChallengeTalk, loginMember);

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


    public void deleteChallengeTalk(Long challengeTalkId, Member loginMember) {

        ChallengeTalk challengeTalk = findChallengeTalkById(challengeTalkId);
        checkUserAuthorization(challengeTalk, loginMember);

        challengeTalkRepository.delete(challengeTalk);
    }

    /**
     * 챌랜지 댓글 관련 유저의 권한 확인
     * 챌린지 댓글 수정, 삭제 시도시 사용한다.
     * @param challengeTalk 변경을 시도하는 챌린지 댓글
     * @param loginMember 챌랜지 댓글 변경을 시도하는 맴버
     */
    private void checkUserAuthorization(ChallengeTalk challengeTalk, Member loginMember){
        if(!memberService.isVerifiedMember(challengeTalk.getMemberId(), loginMember.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_MEMBER);
        }
    }
}
