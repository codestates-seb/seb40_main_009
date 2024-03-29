package be.wiselife.challengereview.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.repository.ChallengeReviewRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = false)
public class ChallengeReviewService {
    private final ChallengeReviewRepository challengeReviewRepository;
    private final ImageService imageService;
    private final MemberService memberService;
    private final ChallengeService challengeService;
    private final MemberChallengeRepository memberChallengeRepository;

    public ChallengeReviewService(ChallengeReviewRepository challengeReviewRepository, ImageService imageService, MemberService memberService, ChallengeService challengeService, MemberChallengeRepository memberChallengeRepository) {
        this.challengeReviewRepository = challengeReviewRepository;
        this.imageService = imageService;
        this.memberService = memberService;
        this.challengeService = challengeService;
        this.memberChallengeRepository = memberChallengeRepository;
    }

    /**
     * 챌린지 후기 생성
     */
    public ChallengeReview createChallengeReview(ChallengeReview challengeReview, Member loginMember, Challenge challenge, MultipartFile image) throws IOException {
        //해당 챌린지에 참여한 유저인지 검증
        log.info("createChallengeReview  tx start");
        memberChallengeRepository.findMemberChallengeByChallengeChallengeIdAndMemberMemberId(challenge.getChallengeId(), loginMember.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_PARTICIPATING_THIS_CHALLENGE));

        //이미 리뷰 작성한 유저인지 검증
        challengeReviewRepository.findChallengeReviewByMemberMemberIdAndChallengeChallengeId(loginMember.getMemberId(), challenge.getChallengeId())
                .ifPresent(a -> {
                    throw new BusinessLogicException(ExceptionCode.CHALLENGE_REVIEW_ALREADY_EXISTS);
                });

        challengeReview.setChallenge(challenge);
        challengeReview.setMember(loginMember);
        challengeReview.setCreate_by_member(loginMember.getMemberName());
        challenge.addChallengeReview(challengeReview);
        /**
         * 작성자 : 유현
         * 리뷰 이미지 등록시 사용하는 로직
         */
        String imageUrl = imageService.patchReviewImage(challengeReview, image);
        challengeReview.setChallengeReviewImagePath(imageUrl);

        log.info("createChallengeReview  tx end");

        return saveChallengeReview(challengeReview);
    }

    public ChallengeReview updateChallengeReview(ChallengeReview changedChallengeReview, Member loginMember, MultipartFile multipartFile)  {

        log.info("updateChallengeReview  tx start");
        ChallengeReview savedChallengeReview = getChallengeReview(changedChallengeReview.getChallengeReviewId());

        //수정하려는 유저의 권한 확인
        checkMemberAuthorization(savedChallengeReview, loginMember);

        //리뷰 수정
        Optional.ofNullable(changedChallengeReview.getChallengeReviewTitle())
                .ifPresent(savedChallengeReview::setChallengeReviewTitle);
        Optional.ofNullable(changedChallengeReview.getChallengeReviewContent())
                .ifPresent(savedChallengeReview::setChallengeReviewContent);
        Optional.of(changedChallengeReview.getChallengeReviewStar())
                .ifPresent(savedChallengeReview::setChallengeReviewStar);
        Optional.ofNullable(changedChallengeReview.getChallengeReviewImagePath())
                .ifPresent(savedChallengeReview::setChallengeReviewImagePath);

        /**
         * 작성자 : 유현
         * 리뷰 이미지 등록시 사용하는 로직
         */
        String ImagePath = imageService.patchReviewImage(savedChallengeReview, multipartFile);
        savedChallengeReview.setChallengeReviewImagePath(ImagePath);

        log.info("updateChallengeReview  tx end");

        return saveChallengeReview(savedChallengeReview);
    }

    /**
     * 챌린지 리뷰 삭제
     * @param challengeReviewId 삭제하려는 리뷰 id
     * @param loginMember 삭제 시도하는 멤버
     */
    public void deleteChallengeReview(Long challengeReviewId, Member loginMember){
        log.info("deleteChallengeReview  tx start");
        ChallengeReview challengeReview = getChallengeReview(challengeReviewId);
        checkMemberAuthorization(challengeReview, loginMember);

        challengeReviewRepository.delete(challengeReview);
        log.info("deleteChallengeReview  tx end");
    }

    /**
     * 해당 챌린지에 속한 리뷰 전체 조회
     * @param challengeId 조회하고자 하는 챌린지 id
     * @return
     */
    @Transactional(readOnly = true)
    public List<ChallengeReview> getChallengeReviewsInChallenge(Long challengeId){
        log.info("getChallengeReviewsInChallenge  tx start");
        List<ChallengeReview> challengeReviewList = challengeReviewRepository.findChallengeReviewsByChallenge_ChallengeId(challengeId).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_REVIEW_NOT_FOUND));
        log.info("getChallengeReviewsInChallenge  tx end");
        return challengeReviewList;
    }

    /**
     * 챌린지 리뷰 id에 해당하는 챌린지 return
     * @param challengeReviewId 찾고 싶은 챌린지 리뷰 id
     * @return 찾은 챌린지 리뷰
     */
    @Transactional(readOnly = true)
    public ChallengeReview getChallengeReview(Long challengeReviewId) {
        log.info("getChallengeReview  tx start");
        log.info("getChallengeReview  tx end");
        return findVerifiedChallengeReviewById(challengeReviewId);
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

    /**
     * 챌랜지 리뷰 관련 유저의 권한 확인
     * 리뷰 수정, 삭제 시도시 사용한다.
     * @param challengeReview 변경 시도하는 리뷰
     * @param loginMember  변경을 시도하는 맴버
     */
    private void checkMemberAuthorization(ChallengeReview challengeReview, Member loginMember){
        if(!memberService.isVerifiedMember(challengeReview.getMember().getMemberId(), loginMember.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_MEMBER);
        }
    }
}
