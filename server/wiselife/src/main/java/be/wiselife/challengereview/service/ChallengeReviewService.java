package be.wiselife.challengereview.service;

import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.repository.ChallengeReviewRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class ChallengeReviewService {
    private final ChallengeReviewRepository challengeReviewRepository;
    private final ImageService imageService;
    private final MemberService memberService;
    private final ChallengeService challengeService;

    public ChallengeReviewService(ChallengeReviewRepository challengeReviewRepository, ImageService imageService, MemberService memberService, ChallengeService challengeService) {
        this.challengeReviewRepository = challengeReviewRepository;
        this.imageService = imageService;
        this.memberService = memberService;
        this.challengeService = challengeService;
    }

    /**
     * 챌린지 후기 생성
     * TODO: MemberChallnge 테이블 만들어 지면 후기 작성하려는 사용자가 실제 참가했는지 확인하는 로직
     */
    public ChallengeReview createChallengeReview(ChallengeReview challengeReview, Long memberId, Long challengeId) {

        challengeReview.setMember(memberService.findMemberById(memberId));
        challengeReview.setChallenge(challengeService.getChallenge(challengeId));
        return saveChallengeReview(challengeReview);
    }

    public ChallengeReview getChallengeReview(Long challengeReviewId) {
        return findVerifiedChallengeReviewById(challengeReviewId);
    }

    public ChallengeReview updateChallengeReview(ChallengeReview changedChallengeReview, String tryingMemberEmail) {
        ChallengeReview savedChallengeReview = getChallengeReview(changedChallengeReview.getChallengeReviewId());

        /*수정하려는 유저의 권한 확인*/
        if(!memberService.isVerifiedMember(savedChallengeReview.getMember().getMemberEmail(), tryingMemberEmail)){
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_MEMBER);
        }

        Optional.ofNullable(changedChallengeReview.getChallengeReviewTitle())
                .ifPresent(savedChallengeReview::setChallengeReviewTitle);
        Optional.ofNullable(changedChallengeReview.getChallengeReviewContent())
                .ifPresent(savedChallengeReview::setChallengeReviewContent);
        Optional.of(changedChallengeReview.getChallengeReviewStar())
                .ifPresent(savedChallengeReview::setChallengeReviewStar);
        Optional.ofNullable(changedChallengeReview.getChallengeReviewImagePath())
                .ifPresent(savedChallengeReview::setChallengeReviewImagePath);

        return saveChallengeReview(savedChallengeReview);
    }

    private ChallengeReview findVerifiedChallengeReviewById(Long challengeReviewId){
        ChallengeReview challengeReview =
                challengeReview = challengeReviewRepository.findById(challengeReviewId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_REVIEW_NOT_FOUND));
        return challengeReview;
    }

    private ChallengeReview saveChallengeReview(ChallengeReview challengeReview){
        return challengeReviewRepository.save(challengeReview);
    }
}
