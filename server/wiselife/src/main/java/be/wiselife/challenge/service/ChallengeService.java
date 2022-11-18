package be.wiselife.challenge.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * TODO: 수정, 삭제시 권한 확인하는 함수
 * */
@Transactional
@Service
@Slf4j
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final ImageService imageService;


    public ChallengeService(ChallengeRepository challengeRepository, ImageService imageService) {

        this.challengeRepository = challengeRepository;
        this.imageService = imageService;
    }

    public Challenge createChallenge(Challenge challenge){
        imageService.patchChallengeRepImage(challenge);
        imageService.postChallengeExamImage(challenge);
        return saveChallenge(challenge);
    }
    /**
     * 챌린지 수정
     *
     * 수정할 값이 null인 경우 수정하지 않는다
     * 추후 수정가능 범위를 어떻게 제한할 것인지 할지 논의 필요함(시작 전 일정, 돈 수정 불가하게 !!! + 시작 후 아무것도 수정 불가)
     *
     * */
    public Challenge updateChallenge(Challenge changedChallenge){
        Challenge existingChallenge = findChallengeById(changedChallenge.getChallengeId());

        Optional.ofNullable(changedChallenge.getChallengeCategory())
                .ifPresent(existingChallenge::setChallengeCategory);
        Optional.ofNullable(changedChallenge.getChallengeTitle())
                .ifPresent(existingChallenge::setChallengeTitle);
        Optional.ofNullable(changedChallenge.getChallengeDescription())
                .ifPresent(existingChallenge::setChallengeDescription);
        Optional.ofNullable(changedChallenge.getChallengeCurrentParty())
                .ifPresent(existingChallenge::setChallengeCurrentParty);
        Optional.ofNullable(changedChallenge.getChallengeAuthCycle())
                .ifPresent(existingChallenge::setChallengeAuthCycle);
        Optional.ofNullable(changedChallenge.getChallengeStartDate())
                .ifPresent(existingChallenge::setChallengeStartDate);
        Optional.ofNullable(changedChallenge.getChallengeEndDate())
                .ifPresent(existingChallenge::setChallengeEndDate);
        Optional.ofNullable(changedChallenge.getChallengeMaxParty())
                .ifPresent(existingChallenge::setChallengeMaxParty);
        Optional.ofNullable(changedChallenge.getChallengeMinParty())
                .ifPresent(existingChallenge::setChallengeMinParty);
        Optional.ofNullable(changedChallenge.getChallengeCurrentParty())
                .ifPresent(existingChallenge::setChallengeCurrentParty);
        Optional.ofNullable(changedChallenge.getChallengeViewCount())
                .ifPresent(existingChallenge::setChallengeViewCount);
        Optional.ofNullable(changedChallenge.getChallengeTotalReward())
                .ifPresent(existingChallenge::setChallengeTotalReward);
        Optional.ofNullable(changedChallenge.getIsClosed())
                .ifPresent(existingChallenge::setIsClosed);
        // 대표 이미지 수정시 사용하는 로직
        if (!Optional.ofNullable(changedChallenge.getChallengeRepImagePath()).isEmpty()) {
            changedChallenge.setRandomIdForImage(existingChallenge.getRandomIdForImage());
            imageService.patchChallengeRepImage(changedChallenge);
            existingChallenge.setChallengeRepImagePath(changedChallenge.getChallengeRepImagePath());
        }

        // 예시 이미지 수정시 사용하는 로직
        if (!Optional.ofNullable(changedChallenge.getChallengeExamImagePath()).isEmpty()) {
            changedChallenge.setRandomIdForImage(existingChallenge.getRandomIdForImage());
            String challengeExamImagePaths=imageService.patchChallengeExamImage(changedChallenge);
            existingChallenge.setChallengeExamImagePath(challengeExamImagePaths);
        }


        return saveChallenge(existingChallenge);
    }

    /**
     * 인증사진 등록
     * @param certImageInfo 인증사진이 속한 Challenge 아이디와 인증사진 경로
     * @param loginMember 로그인한 사람의 이메일 정보를 가져오기위한 인자값
     * TODO
     * 챌린지 참여인원인지 판단하는 로직 추가
     */
    public Challenge createCertImage(Challenge certImageInfo, Member loginMember) {
        Challenge challenge = findChallengeById(certImageInfo.getChallengeId());
        challenge.setChallengeCertImagePath(certImageInfo.getChallengeCertImagePath());

        String certImagePath= imageService.postChallengeCertImage(challenge, loginMember);
        challenge.setChallengeCertImagePath(certImagePath);
        return challengeRepository.save(challenge);
    }

    public Challenge getChallenge(Long challengeId) {
        return findChallengeById(challengeId);
    }

    public void deleteChallenge(Long challengeId) {
        challengeRepository.delete(findChallengeById(challengeId));

    }

    /**
    * 조회수 증가 함수
    * TODO: cookie를 이용한 중복 조회 기능
    * */
    public Challenge updateViewCount(Challenge challenge){
        challenge.setChallengeViewCount(challenge.getChallengeViewCount() + 1);
        return saveChallenge(challenge);
    }

    private Challenge findChallengeById(Long challengeId){
        return verifyChallengeById(challengeId);
    }

    private Challenge saveChallenge(Challenge challenge){
        return challengeRepository.save(challenge);
    }

    private Challenge verifyChallengeById(Long challengeId){
        return challengeRepository.findById(challengeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
    }


}
