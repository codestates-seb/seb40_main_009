package be.wiselife.challenge.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.service.MemberChallengeService;
import be.wiselife.order.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Set;


/**
 * 수정, 삭제시 권한 확인하는 함수
 * 
 */
@Transactional(readOnly = false)
@Service
@Slf4j
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final ImageService imageService;
    private final MemberService memberService;
    private final MemberChallengeService memberChallengeService;


    public ChallengeService(ChallengeRepository challengeRepository,MemberRepository memberRepository,
                            ImageService imageService, MemberService memberService,
                            MemberChallengeService memberChallengeService) {
        this.challengeRepository = challengeRepository;
        this.memberRepository = memberRepository;
        this.imageService = imageService;
        this.memberService = memberService;
        this.memberChallengeService = memberChallengeService;
    }

    /**
     * 챌린지 객체 생성 및 저장
     *
     * @param challenge    생성 및 저장하고자 하는 챌린지 객체
     * @param loginMember  생성 시도하는 멤버 정보(추후 챌린지 수정, 삭제할 때 해당 정보를 확인한다)
     * @param repImage
     * @param exampleImage
     * @return
     */
    public Challenge createChallenge(Challenge challenge, Member loginMember, MultipartFile repImage, List<MultipartFile> exampleImage) throws IOException {
        log.info("createChallenge tx start");
        if (challenge.getChallengeMaxParty() < challenge.getChallengeMinParty()) {
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_MAX_PARTY_CAN_NOT_SMALLER_THAN_MIN_PARTY);
        }
        challenge.setCreate_by_member(loginMember.getMemberName());
        challenge.setAuthorizedMemberId(loginMember.getMemberId());

        String representImagePath = imageService.patchChallengeRepImage(challenge, repImage);
        List<String> ExamImagesPath = imageService.postChallengeExamImage(challenge, exampleImage);

        String getall = listToString(ExamImagesPath);

        challenge.setChallengeRepImagePath(representImagePath);
        challenge.setChallengeExamImagePath(getall);

        challenge = participateChallenge(challenge, loginMember);
        log.info("createChallenge tx end");
        return saveChallenge(challenge);
    }

    public Challenge participateChallenge(Challenge challenge, Member loginMember) {
        log.info("participateChallenge tx start");
        log.info("participateChallenge tx end");
        return memberChallengeService.plusMemberAndChallenge(challenge,loginMember);
    }


    /**
     * 챌린지 수정 기능
     * 1) 시작 전 일정, 돈 수정 불가
     * 2) 시작 후 아무것도 수정 불가
     * */
    public Challenge updateChallenge(Challenge changedChallenge, Member loginMember,
                                     Long challengeId, List<MultipartFile> exampleImage, MultipartFile repImage) throws IOException {

        log.info("updateChallenge tx start");
        Challenge existingChallenge = findChallengeById(challengeId);

        //유저 권한 확인
        checkMemberAuthorization(existingChallenge, loginMember);

        //챌린지 수정
        Optional.ofNullable(changedChallenge.getChallengeCategory())
                .ifPresent(existingChallenge::setChallengeCategory);
        Optional.ofNullable(changedChallenge.getChallengeTitle())
                .ifPresent(existingChallenge::setChallengeTitle);
        Optional.ofNullable(changedChallenge.getChallengeDescription())
                .ifPresent(existingChallenge::setChallengeDescription);
        if(changedChallenge.getChallengeAuthCycle() != 0)
            existingChallenge.setChallengeAuthCycle(changedChallenge.getChallengeAuthCycle());
        Optional.ofNullable(changedChallenge.getChallengeStartDate())
                .ifPresent(existingChallenge::setChallengeStartDate);
        Optional.ofNullable(changedChallenge.getChallengeEndDate())
                .ifPresent(existingChallenge::setChallengeEndDate);
        if(changedChallenge.getChallengeMaxParty() != 0)
            existingChallenge.setChallengeMaxParty(changedChallenge.getChallengeMaxParty());
        if(changedChallenge.getChallengeMinParty() != 0)
            existingChallenge.setChallengeMinParty(changedChallenge.getChallengeMinParty());
        if(changedChallenge.getChallengeViewCount() != 0)
            existingChallenge.setChallengeViewCount(changedChallenge.getChallengeViewCount());
        Optional.ofNullable(changedChallenge.getChallengeAuthAvailableTime())
                .ifPresent(existingChallenge::setChallengeAuthAvailableTime);
        /**
         * 작성자 : 유현
         * 대표 이미지 수정시 사용하는 로직
         */
        if (Optional.ofNullable(changedChallenge.getChallengeRepImagePath()).isPresent()) {
            changedChallenge.setRandomIdForImage(existingChallenge.getRandomIdForImage());
            String repImageUrl = imageService.patchChallengeRepImage(changedChallenge, repImage);
            existingChallenge.setChallengeRepImagePath(repImageUrl);
        }

        /**
         * 작성자 : 유현
         * 예시 이미지 수정시 사용하는 로직
         */
        if (Optional.ofNullable(changedChallenge.getChallengeExamImagePath()).isPresent()) {
            changedChallenge.setRandomIdForImage(existingChallenge.getRandomIdForImage());
            String challengeExamImagePaths= imageService.patchChallengeExamImage(changedChallenge, exampleImage);
            existingChallenge.setChallengeExamImagePath(challengeExamImagePaths);
        }

        log.info("updateChallenge tx end");
        return saveChallenge(existingChallenge);
    }

    /**
     * 챌린지에는 참여인원에 대한 정보를 제공
     * 멤버에는 참여중, 참여했던 챌린지에 대한 정보를 제공
     * @param loginMember 현재 로그인한 유저
     * @param challenge 현재 참여하고자 하는 챌린지
     * @return challenge 참가했을때 잘 참여됐는지 즉시 확인가능
     */
    public Challenge minusParticipateChallenge(Challenge challenge, Member loginMember) {
        log.info("minusParticipateChallenge tx start");
        log.info("minusParticipateChallenge tx end");
        return memberChallengeService.minusMemberAndChallenge(challenge,loginMember);
    }

    /**
     * 작성자 : 유현
     * 인증사진 등록 / 수정
     *
     * @param challengeId
     * @param loginMember   로그인한 사람의 이메일 정보를 가져오기위한 인자값
     *                      챌린지 참여인원인지 판단하는 로직 추가
     * @param multipartFile
     */
    public Challenge updateCertImage(Long challengeId, Member loginMember, MultipartFile multipartFile) throws IOException {
        log.info("updateCertImage tx start");
        Challenge challenge = findChallengeById(challengeId);
        challenge.setChallengeCertImagePath(imageService.getOneImagePath(multipartFile));
        log.info("updateCertImage tx end");
        return challengeRepository.save(imageService.patchChallengeCertImage(challenge, loginMember));
    }

    /**
     * 챌린지 id를 통한 챌린지 조회
     * @param challengeId CHALLENGE 테이블의 PK
     * @return
     */
    @Transactional(readOnly = true)
    public Challenge getChallengeById(Long challengeId) {
        log.info("getChallengeById tx start");
        log.info("getChallengeById tx end");

        return findChallengeById(challengeId);
    }


    /**
     * 챌린지 삭제
     * @param challengeId CHALLENGE 테이블의 PK
     * @param loginMember 삭제 시도하는 멤버
     */
    public void deleteChallenge(Long challengeId, Member loginMember) {
        log.info("deleteChallengeById tx start");

        Challenge savedChallenge = findChallengeById(challengeId);
        //유저 권한 확인
        checkMemberAuthorization(savedChallenge, loginMember);
        //챌린지가 시작됐는지 여부 확인
        checkTimeAuthorization(savedChallenge);
        //삭제
        challengeRepository.delete(savedChallenge);
        log.info("deleteChallengeById tx end");
    }

    //챌린지가 시작한 후인지 확인하는 함수
    private void checkTimeAuthorization(Challenge savedChallenge) {
        LocalDate now = LocalDate.now();
        if(now.isAfter(savedChallenge.getChallengeStartDate()))
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_ALREADY_STARTED);
    }

    /**
    * 조회수 증가 함수
    * */
    public Challenge updateViewCount(Challenge challenge){
        log.info("updateViewCount tx start");
        challenge.setChallengeViewCount(challenge.getChallengeViewCount() + 1);
        log.info("updateViewCount tx end");

        return saveChallenge(challenge);
    }

    @Transactional(readOnly = true)
    public Challenge findChallengeById(Long challengeId){
        log.info("findChallengeById tx start");
        log.info("findChallengeById tx end");

        return verifyChallengeById(challengeId);
    }

    /**
     * 카테고리별 전체 첼린지 조회
     * @param categoryId 1~3 사이의 카테고리 id
     * @return 해당 카테고리의 챌린지 list
     */
    @Transactional(readOnly = true)
    public Page<Challenge> getAllChallengesInCategory(Long categoryId, int page, int size, String sortBy) {
        log.info("getAllChallengesInCategory tx start");
        Challenge.ChallengeCategory challengeCategory = categoryIdToChallengeCategory(categoryId);
        log.info("getAllChallengesInCategory tx end");
        return challengeRepository.findChallengesByChallengeCategory(challengeCategory, getPageRequest(page, size, sortBy))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Challenge> getAllChallenges() {
        log.info("getAllChallenges tx start");
        List<Challenge> challengeList = challengeRepository.findAll();
        log.info("getAllChallenges tx end");

        return challengeList;
    }

    /**
     * 챌린지 검색 by 제목
     * @param searchTitle 챌린지 제목 검색어
     * @return
     */
    @Transactional(readOnly = true)
    public Page<Challenge> searchChallengesByChallengeTitle(String searchTitle, int page, int size, String sortBy) {
        log.info("searchChallengesByChallengeTitle tx start");

        log.info("searchChallengesByChallengeTitle tx end");
        return challengeRepository.findChallengesByChallengeTitleContaining(searchTitle, getPageRequest(page, size, sortBy))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));

    }

    /**
     * 챌린지 평균 성공률 update
     * 챌린지에 참여한 멤버들의 성공률의 평균을 저장한다.
     * Scheduler 사용해서 실행한다.
     */
    public void updateChallengeSuccessRate(int totalThreadNum, int currentThreadOrder){
        //진행중인 챌린지 전체 조회
        List<Challenge> challengeList = challengeRepository.findChallengesByIsClosed(false).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
        challengeList = challengeList.subList(challengeList.size()/totalThreadNum * (currentThreadOrder-1), challengeList.size()/totalThreadNum * currentThreadOrder);

        //챌린지에 참여중인 유저의 성공률의 평균을 계산하여 챌린지에 넣는다
        double challengeSuccessRate;

        for(Challenge challenge : challengeList){
            challengeSuccessRate = 0;
            for(MemberChallenge memberChallenge : challenge.getMemberChallenges()){
                challengeSuccessRate += (memberChallenge.getMemberChallengeSuccessRate() / 100);
            }
            challengeSuccessRate /= challenge.getMemberChallenges().size() ;
            challenge.setChallengeSuccessRate(challengeSuccessRate);
        }

        challengeRepository.saveAll(challengeList);
    }

    /**
     * 챌린지 종료에 따른 상태 변경
     * 챌린지가 종료되었다면 Challenge table의 boolean isClosed가 true로 변경된다.
     * Scheduler 사용해서 실행한다.
     */
    public void updateChallengeIsClosedStatus(){
        //진행중인 챌린지 전체 조회
        log.info("updateChallengeIsClosedStatus tx start");
        List<Challenge> challengeList = challengeRepository.findChallengesByIsClosed(false).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));

        LocalDate now = LocalDate.now();
        //현재와 챌린지 종료일 비교
        for(Challenge challenge : challengeList){
            if(now.isAfter(challenge.getChallengeEndDate())){
                challenge.setIsClosed(true);
                updateMemberMoney(challenge);
            }
            if (now.equals(challenge.getChallengeStartDate())&&(challenge.getChallengeCurrentParty()<challenge.getChallengeMinParty())) {
                challenge.setIsClosed(true);
                updateMemberMoney(challenge);
            }
        }
        challengeRepository.saveAll(challengeList);
        log.info("updateChallengeIsClosedStatus tx end");
    }

    private void updateMemberMoney(Challenge challenge) {
        Set<MemberChallenge> memberChallenges = challenge.getMemberChallenges();
        for (MemberChallenge memberChallenge : memberChallenges) {
            Member member = memberChallenge.getMember();
            double memberMoney = member.getMemberMoney();
            memberMoney+=memberChallenge.getExpectedRefundToMember();
            member.setMemberMoney(memberMoney);
            memberRepository.save(member);
        }
    }


    /**
     * paging 위한 pageRequest 설정
     * @param sortBy      paging 기준 1.newest(=최신순) 2.popularity(=인기순)
     * @param page        조회하고 싶은 페이지 숫자
     * @param size        한 페이지에 들어갈 챌린지 개수
     * @return
     */
    private PageRequest getPageRequest(int page, int size, String sortBy){
        if(sortBy.equals("newest"))
            sortBy = "createdAt";
        else
            sortBy = "challengeViewCount";

        return PageRequest.of(page, size, Sort.by(sortBy).descending());
    }

    /**
     * 챌린지 저장
     * @param challenge 저장하고자 하는 챌린지
     * @return
     */
    private Challenge saveChallenge(Challenge challenge){
        return challengeRepository.save(challenge);
    }

    /**
     * 챌린지 id 유효성 검사
     * @param challengeId
     * @return 1) 챌린지 존재하면 챌린지 객체 반환
     *         2) 챌린지 존재하지 않으면 예외 발생
     */
    private Challenge verifyChallengeById(Long challengeId){
        return challengeRepository.findById(challengeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
    }

    /**
     * 챌랜지 관련 유저의 권한 확인
     * 챌린지 수정, 삭제 시도시 사용한다.
     * @param Challenge 변경 시도하는 챌린지
     * @param loginMember 변경을 시도하는 맴버
     */
    private void checkMemberAuthorization(Challenge Challenge, Member loginMember){

        if(!memberService.isVerifiedMember(Challenge.getAuthorizedMemberId(), loginMember.getMemberId()))
            throw new BusinessLogicException(ExceptionCode.FORBIDDEN_MEMBER);

    }

    /**
     * 카테고리 id => 카테고리 enum으로 변환
     * @param categoryId
     * @return
     */
    private Challenge.ChallengeCategory  categoryIdToChallengeCategory(Long categoryId){
        Challenge.ChallengeCategory challengeCategory = null;

        if (categoryId == 1) {
            challengeCategory = Challenge.ChallengeCategory.BUCKET_LIST;
        } else if (categoryId == 2) {
            challengeCategory = Challenge.ChallengeCategory.SHARED_CHALLENGE;
        } else if (categoryId == 3){
            challengeCategory = Challenge.ChallengeCategory.OFFLINE_CHALLENGE;
        }

        return challengeCategory;
    }

    /**
     * list를 String 화해주는 작업
     */
    private static String listToString(List<String> ExamImagesPath) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < ExamImagesPath.size(); i++) {
            builder.append(ExamImagesPath.get(i)).append(",");
        }
        builder.deleteCharAt(builder.length() - 1);
        String getall = builder.toString();
        return getall;
    }

    /**
     * 챌린지 상금 & 개인당 환급 받을 금액을 계산
     * 챌린지 상금과 개인당 환급 받을 금액이 연결되어 있어 함께 계산
     * 주의할 점은 챌린지 상금을 기반으로 개인당 환급 받을 금액을 계산하기에 추후 수정한다면 순서에 유의
     */
    public void updateChallengeTotalRewardAndMemberChallengeToBeRefunded(int totalThreadNum, int currentThreadOrder) {
        //진행중인 챌린지 전체 조회
        List<Challenge> challengeList = challengeRepository.findChallengesByIsClosed(false).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
        challengeList = challengeList.subList(challengeList.size()/totalThreadNum * (currentThreadOrder-1), challengeList.size()/totalThreadNum * currentThreadOrder);

        double progressRate;
        double challengeSuccessRate;
        int challengeFeePerPerson;
        int challengeParticipantsNum;

        for(Challenge challenge : challengeList){
            progressRate = getChallengeProgressRate(challenge.getChallengeStartDate(), challenge.getChallengeEndDate());
            challengeSuccessRate = challenge.getChallengeSuccessRate();
            challengeFeePerPerson = challenge.getChallengeFeePerPerson();
            challengeParticipantsNum = challenge.getMemberChallenges().size();
            //인당 참가비 * 진행률 * 참가 인원 * (1 - 평균 성공률) = 챌린지 상금
            challenge.setChallengeTotalReward(challengeFeePerPerson * progressRate * challengeParticipantsNum * (1-challengeSuccessRate));

            //개인당 환급 받을 금액 update
            memberChallengeService.updateMemberChallengeExpectedRefund(challenge, progressRate);
        }

        challengeRepository.saveAll(challengeList);
    }


    /**
     * 챌린지 진행률 계산
     * @param startDate 챌린지 시작 일자
     * @param endDate   챌린지 종료 일자
     * @return
     */
    @Transactional(readOnly = true)
    public double getChallengeProgressRate(LocalDate startDate, LocalDate endDate){
        log.info("getChallengeProgressRate  tx start");
        double challengeTotalDay;
        LocalDate now = LocalDate.now();

        challengeTotalDay = ChronoUnit.DAYS.between(startDate, endDate) + 1;
        System.out.printf("challengeTotalDay: %f",challengeTotalDay);
        log.info("getChallengeProgressRate  tx end");

        double progressRate = ((double)ChronoUnit.DAYS.between(startDate, now) + 1) / challengeTotalDay;
        if(progressRate > 1) return 1;

        return (progressRate > 0) ? progressRate : 0;
    }
}
