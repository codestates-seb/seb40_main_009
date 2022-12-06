package be.wiselife.image.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.image.entity.*;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class ImageService {
    private final ImageRepository imageRepository;
    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberRepository memberRepository;
    private final S3UploadService s3UploadService;

    //MemberImage 부분 코드====================================== mem image
    /**
     * 사진을 수정한 멤버 이미지를 받는다.
     * 카카오톡 이미지 외에 등록한적이 없다면, 새로 memberImage를 생성해서 저장
     * 카카오톡 이미지 외에 등록한적이 있다면, 기존것을 db에서 찾아서 수정
     */
    public void patchMemberImage(Member member, MultipartFile multipartFiles) throws IOException {
        log.info("patchMemberImage  tx start");

        MemberImage memberImageFromRepository =
                imageRepository.findByImageTypeAndMemberId("MI", member.getMemberId());

        String ImageUrl = s3UploadService.uploadJustOne(multipartFiles); //이미지 URL받아오기

        if (memberImageFromRepository == null) {
            MemberImage memberImage = new MemberImage();
            saveMemberImage(member, memberImage, ImageUrl);
            log.info("patchMemberImage  tx end");
        } else {
            saveMemberImage(member, memberImageFromRepository, ImageUrl);
            log.info("patchMemberImage  tx end");
        }
    }

    // MemberImage 중복코드 줄이는 용도
    private void saveMemberImage(Member member, MemberImage memberImage, String imageUrl) {
        memberImage.setImagePath(imageUrl);
        memberImage.setMemberId(member.getMemberId());
        member.setMemberImagePath(imageUrl);
        imageRepository.save(memberImage);
    }

    //ChallengeRepImage 부분 코드====================================== rep image 받아옴
    public String patchChallengeRepImage(Challenge challenge, MultipartFile repImage) throws IOException {
        log.info("patchChallengeRepImage tx start");

        ChallengeRepImage challengeRepImageFromRepository =
                imageRepository.findByImageTypeAndChallengeRep("CRI", challenge.getRandomIdForImage());
        String newRepImage = s3UploadService.uploadJustOne(repImage);

        if (challengeRepImageFromRepository == null) {
            ChallengeRepImage challengeRepImage = new ChallengeRepImage();
            challengeRepImage.setImagePath(newRepImage);
            saveChallengeRepImage(challenge, challengeRepImage);
        } else {
            challengeRepImageFromRepository.setImagePath(newRepImage);
            saveChallengeRepImage(challenge,challengeRepImageFromRepository);
        }
        log.info("patchChallengeRepImage tx end");
        return newRepImage;
    }
    // ChallengeRepImage 중복코드 줄이는 용도
    private void saveChallengeRepImage(Challenge challenge, ChallengeRepImage challengeRepImage) {
        challengeRepImage.setRandomIdForImage(challenge.getRandomIdForImage());
        imageRepository.save(challengeRepImage);
    }

    //ChallengeExamImage 부분 코드======================================
    public List<String> postChallengeExamImage(Challenge challenge, List<MultipartFile> exampleImage) {
        log.info("postChallengeExamImage  tx start");
        List<String> exampleImages = s3UploadService.uploadAsList(exampleImage);
        String[] imagePaths = exampleImages.toArray(String[]::new);

        for (String imagePath : imagePaths) {
            ChallengeExamImage challengeExamImage = new ChallengeExamImage();
            challengeExamImage.setImagePath(imagePath);
            challengeExamImage.setRandomIdForImage(challenge.getRandomIdForImage());
            imageRepository.save(challengeExamImage);
        }
        log.info("postChallengeExamImage  tx end");
        return exampleImages;
    }

    public String patchChallengeExamImage(Challenge challenge, List<MultipartFile> exampleImage) {
        log.info("patchChallengeExamImage  tx start");
        List<ChallengeExamImage> challengeExamImages
                = imageRepository.findByImageTypeAndChallengeExam("CEI", challenge.getRandomIdForImage());

        List<String> imageUrls = s3UploadService.uploadAsList(exampleImage);
        String[] imagePath = imageUrls.toArray(String[]::new);

        //겹치지않는거 판단하는 용도
        ArrayList<Boolean> imageCheckList = new ArrayList<>();

        for (int i = 0; i < imagePath.length; i++) {
            imageCheckList.add(false);
        }

        // 데이터베이스의 이미지 경로와 patchDto에 전달된 경로가 같으면 데이터베이스에서 삭제
        for (int i =0;i<challengeExamImages.size();i++) {
            for (int j = 0; j < imagePath.length; j++) {
                if (challengeExamImages.get(i).getImagePath().equals(imagePath[j])) {
                    imageCheckList.set(j, true);
                    imageRepository.delete(challengeExamImages.get(i));
                }
            }
        }

        // 같은게 반복문 끝날때까지 없다면 그 경로를 등록
        for (int i = 0; i < imagePath.length; i++) {
            ChallengeExamImage challengeExamImage = new ChallengeExamImage();
            if (!imageCheckList.get(i)) {
                challengeExamImage.setImagePath(imagePath[i]);
                challengeExamImage.setRandomIdForImage(challenge.getRandomIdForImage());
                imageRepository.save(challengeExamImage);
            }
        }
        // 바뀐 db의 경로들을 다시 한 문장으로 변경
        List<ChallengeExamImage> changeChallengeExamImages
                = imageRepository.findByImageTypeAndChallengeExam("CEI", challenge.getRandomIdForImage());

        String changeImagePath = "";
        for (ChallengeExamImage changeChallengeExamImage : changeChallengeExamImages) {
            changeImagePath = changeImagePath+changeChallengeExamImage.getImagePath() + ",";
        }
        if (changeImagePath.equals("")) {
            throw new BusinessLogicException(ExceptionCode.CHALLENGE_EXAM_IMAGE_MUST_ENROLL);
        }
        log.info("patchChallengeExamImage  tx end");
        return changeImagePath;
    }

    //ReviewImage 부분 코드======================================
    public String patchReviewImage(ChallengeReview review, MultipartFile image) {
        log.info("patchReviewImage  tx start");
        ReviewImage reviewImageFromRepository =
                imageRepository.findByImageTypeAndReviewImageId("RI", review.getReviewRandomId());

        if (reviewImageFromRepository == null) {
            ReviewImage reviewImage = new ReviewImage();
            String ImagePath = s3UploadService.uploadJustOne(image);
            reviewImage.setImagePath(ImagePath);
            saveReviewImage(review, reviewImage);
            log.info("patchReviewImage  tx end");
            return ImagePath;
        } else {
            reviewImageFromRepository.setImagePath(review.getChallengeReviewImagePath());
            saveReviewImage(review, reviewImageFromRepository);
            log.info("patchReviewImage  tx end");
            return reviewImageFromRepository.getImagePath();
        }


    }

    // MemberImage 중복코드 줄이는 용도
    private void saveReviewImage(ChallengeReview review, ReviewImage reviewImage) {

        reviewImage.setRandomIdForImage(review.getReviewRandomId());
        imageRepository.save(reviewImage);
    }

    //ChallengeCertImage 부분 코드======================================
    /**
     *
     * @param challenge 를 통해, 인증 사진을 등록하고, 하루 의무인증횟수를 채웠는지 판단한다.
     * @param loginMember 를 통해, 로그인된 회원이 챌린지 참여중인지 파악하고, 의무 인증횟수를 채우면 성공일자를 증가 시켜준다.
     * @return
     */
    public Challenge patchChallengeCertImage(Challenge challenge, Member loginMember) {
        log.info("patchReviewImage tx start");
        MemberChallenge memberChallengeFromRepository = memberChallengeRepository.findByChallengeAndMember(challenge,loginMember);
        if ( memberChallengeFromRepository== null) {
            log.info("patchReviewImage tx end");
            throw new BusinessLogicException(ExceptionCode.YOU_MUST_PARTICIPATE_TO_CHALLENGE_FIRST);
        }

        ChallengeCertImage challengeCertImage =
                imageRepository.findByImageTypeAndMemberIdAndChallengeCertIdPatch("CCI",
                        loginMember.getMemberId(), challenge.getRandomIdForImage());

        List<ChallengeCertImage> challengeCertImages =
                imageRepository.findByImageTypeAndMemberIdAndChallengeCertIdCount("CCI",
                        loginMember.getMemberId(), challenge.getRandomIdForImage());

        Challenge challengeUpdateChallengeCertImage=patchCertificationImage(challenge, loginMember, challengeCertImage, challengeCertImages);

        challengeCertImages.add(challengeCertImage);

        isSuccessDay(challenge, memberChallengeFromRepository, challengeCertImages);

        plusSuccessCount(loginMember);

        calculateMemberChallengePercentage(loginMember);
        log.info("patchReviewImage tx end");
        return challengeUpdateChallengeCertImage;
    }
    // 인증사진 등록 및 수정 메소드
    private Challenge patchCertificationImage(Challenge challenge, Member loginMember, ChallengeCertImage challengeCertImage,List<ChallengeCertImage> challengeCertImages) {
        //인증가능 시간인지 검증
        if(!isAuthAvailableTime(challenge, challengeCertImages))
            throw new BusinessLogicException(ExceptionCode.NOT_CERTIFICATION_AVAILABLE_TIME);

        //인증횟수 CHECK
        if(challengeCertImages.size() >= challenge.getChallengeAuthCycle())
            throw new BusinessLogicException(ExceptionCode.ALREADY_VERIFIED_TODAY_TOTAL_QUOTA);

        if (challengeCertImage == null) {
            challengeCertImage = new ChallengeCertImage();
            challengeCertImage.setRandomIdForImage(challenge.getRandomIdForImage());
            challengeCertImage.setMemberId(loginMember.getMemberId());
            challenge.getChallengeCertImages().add(challengeCertImage);
            challengeCertImage.setChallenge(challenge);
        }
        challengeCertImage.setImagePath(challenge.getChallengeCertImagePath());
        imageRepository.save(challengeCertImage);
        return challenge;
    }

    /**
     * 인증가능 시간인지 검증
     * @param challenge 인증 사진 관련된 해당 챌린지
     * @param challengeCertImages 오늘 해당 멤버가 올린 인증 사진들
     * @return
     */
    private boolean isAuthAvailableTime(Challenge challenge, List<ChallengeCertImage> challengeCertImages){
        LocalTime now = LocalTime.now();
        LocalDate todayDate = LocalDate.now();
        List<String> challengeAuthAvailableTime = challenge.getChallengeAuthAvailableTime();
        LocalTime authAvailableTime;

        //데모데이 이벤트 챌린지인 경우 인증시간 인증을 거치지 않도록
        if(challenge.getChallengeTitle().startsWith("[이벤트]")) return true;

        //날짜 검증
        if(todayDate.isBefore(challenge.getChallengeStartDate()) || todayDate.isAfter(challenge.getChallengeEndDate()))
            return false;

        //시간 검증
        for(String time : challengeAuthAvailableTime){
            authAvailableTime = LocalTime.parse(time);
            if(authAvailableTime.equals(now) || now.isAfter(authAvailableTime) && now.isBefore(authAvailableTime.plusMinutes(11)))
                return true;
        }

        return false;
    }

    // 멤버가 참여한 챌린지에 대한 하루를 성공으로 칠껀지에 대한 로직
    private void isSuccessDay(Challenge challenge, MemberChallenge memberChallengeFromRepository, List<ChallengeCertImage> challengeCertImages) {
        if (challengeCertImages.size() == challenge.getChallengeAuthCycle()) {
            memberChallengeFromRepository.setMemberSuccessDay(memberChallengeFromRepository.getMemberSuccessDay()+1);

            double memberChallengeSuccessRate = ((double)memberChallengeFromRepository.getMemberSuccessDay()/(ChronoUnit.DAYS.between(challenge.getChallengeStartDate(), LocalDate.now())+ 1) )*100;
            memberChallengeFromRepository.setMemberChallengeSuccessRate(memberChallengeSuccessRate);

            memberChallengeRepository.save(memberChallengeFromRepository);
        }
    }

    /**
     * 멤버가 사진을 올릴때 마다 successCount 증가(회의에서 합의된 부분)
     * 여기서 레벨업 로직 구현
     */
    private void plusSuccessCount(Member loginMember) {
        int successCount =imageRepository.findCertImageByImageTypeAndMemberId("CCI", loginMember.getMemberId()).size();
        if (loginMember.getMemberExp() >= loginMember.getMemberBadge().getObjExperience()) {
            int memberLevel = loginMember.getMemberBadge().getLevel()+1;
            loginMember.setMemberLevel(memberLevel);
            loginMember.setMemberBadge(Member.MemberBadge.badgeOfLevel(memberLevel));
        }
        loginMember.setMemberExp(successCount);
    }

    //멤버 성공률 판단 부분
    private void calculateMemberChallengePercentage(Member loginMember) {
        List<MemberChallenge> memberChallengeList = memberRepository.findMemberChallengeByMember(loginMember);
        double memberChallengeSuccessRate = 0;

        for (MemberChallenge memberChallenge : memberChallengeList) {
                memberChallengeSuccessRate=memberChallengeSuccessRate+memberChallenge.getMemberChallengeSuccessRate();
        }
        loginMember.setMemberChallengePercentage(memberChallengeSuccessRate/memberChallengeList.size());
        memberRepository.save(loginMember);
    }

    /*
     * s3서비스를 대행해주는 역할
     */
    public String getOneImagePath(MultipartFile multipartFile) throws IOException {
        log.info("getOneImagePath tx start");
        log.info("getOneImagePath tx end");
        return s3UploadService.uploadJustOne(multipartFile);
    }

}
