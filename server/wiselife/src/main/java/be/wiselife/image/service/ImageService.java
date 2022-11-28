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
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final MemberChallengeRepository memberChallengeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final S3UploadService s3UploadService;

    //MemberImage 부분 코드====================================== mem image
    /**
     * 사진을 수정한 멤버 이미지를 받는다.
     * 카카오톡 이미지 외에 등록한적이 없다면, 새로 memberImage를 생성해서 저장
     * 카카오톡 이미지 외에 등록한적이 있다면, 기존것을 db에서 찾아서 수정
     */
    public void patchMemberImage(Member member, MultipartFile multipartFiles) throws IOException {
        MemberImage memberImageFromRepository =
                imageRepository.findByImageTypeAndMemberId("MI", member.getMemberId());
        
        String ImageUrl = s3UploadService.uploadJustOne(multipartFiles); //이미지 URL받아오기
       
        if (memberImageFromRepository == null) {
            MemberImage memberImage = new MemberImage();
            saveMemberImage(member, memberImage, ImageUrl);
        } else {
            saveMemberImage(member, memberImageFromRepository, ImageUrl);
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

        return newRepImage;
    }
    // ChallengeRepImage 중복코드 줄이는 용도
    private void saveChallengeRepImage(Challenge challenge, ChallengeRepImage challengeRepImage) {
        challengeRepImage.setRandomIdForImage(challenge.getRandomIdForImage());
        imageRepository.save(challengeRepImage);
    }

    //ChallengeExamImage 부분 코드======================================
    public List<String> postChallengeExamImage(Challenge challenge, List<MultipartFile> exampleImage) {
        List<String> exampleImages = s3UploadService.uploadAsList(exampleImage);
        String[] imagePaths = exampleImages.toArray(String[]::new);

        for (String imagePath : imagePaths) {
            ChallengeExamImage challengeExamImage = new ChallengeExamImage();
            challengeExamImage.setImagePath(imagePath);
            challengeExamImage.setRandomIdForImage(challenge.getRandomIdForImage());
            imageRepository.save(challengeExamImage);
        }
        return exampleImages;
    }

    public String patchChallengeExamImage(Challenge challenge, List<MultipartFile> exampleImage) {
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
        return changeImagePath;
    }

    //ReviewImage 부분 코드======================================
    public String patchReviewImage(ChallengeReview review, MultipartFile image) {
        ReviewImage reviewImageFromRepository =
                imageRepository.findByImageTypeAndReviewImageId("RI", review.getReviewRandomId());

        if (reviewImageFromRepository == null) {
            ReviewImage reviewImage = new ReviewImage();
            String ImagePath = s3UploadService.uploadJustOne(image);
            reviewImage.setImagePath(ImagePath);
            saveReviewImage(review, reviewImage);
            return ImagePath;
        } else {
            reviewImageFromRepository.setImagePath(review.getChallengeReviewImagePath());
            saveReviewImage(review, reviewImageFromRepository);
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
        MemberChallenge memberChallengeFromRepository = memberChallengeRepository.findByChallengeAndMember(challenge,loginMember);
        if ( memberChallengeFromRepository== null) {
            throw new BusinessLogicException(ExceptionCode.YOU_MUST_PARTICIPATE_TO_CHALLENGE_FIRST);
        }

        ChallengeCertImage challengeCertImage =
                imageRepository.findByImageTypeAndMemberIdAndChallengeCertIdPatch("CCI",
                        loginMember.getMemberId(), challenge.getRandomIdForImage());

        Challenge challengeUpdateChallengeCertImage=patchCertificationImage(challenge, loginMember, challengeCertImage);

        List<ChallengeCertImage> challengeCertImages =
                imageRepository.findByImageTypeAndMemberIdAndChallengeCertIdCount("CCI",
                        loginMember.getMemberId(), challenge.getRandomIdForImage());

        isSuccessDay(challenge, memberChallengeFromRepository, challengeCertImages);

        plusSuccessCount(loginMember);

        calculateMemberChallengePercentage(loginMember);

        return challengeUpdateChallengeCertImage;
    }
    // 인증사진 등록 및 수정 메소드
    private Challenge patchCertificationImage(Challenge challenge, Member loginMember, ChallengeCertImage challengeCertImage) {
        if (challengeCertImage == null) {
            challengeCertImage = new ChallengeCertImage();
            challengeCertImage.setImagePath(challenge.getChallengeCertImagePath());
            log.info("cerImage1={}",challenge.getChallengeCertImagePath());
            challengeCertImage.setRandomIdForImage(challenge.getRandomIdForImage());
            challengeCertImage.setMemberId(loginMember.getMemberId());
            challenge.getChallengeCertImages().add(challengeCertImage);
            challengeCertImage.setChallenge(challenge);
            imageRepository.save(challengeCertImage);
            return challenge;
        }
        challengeCertImage.setImagePath(challenge.getChallengeCertImagePath());
        imageRepository.save(challengeCertImage);
        return challenge;
    }

    // 멤버가 참여한 챌린지에 대한 하루를 성공으로 칠껀지에 대한 로직
    private void isSuccessDay(Challenge challenge, MemberChallenge memberChallengeFromRepository, List<ChallengeCertImage> challengeCertImages) {
        if (challengeCertImages.size() == challenge.getChallengeAuthCycle()) { //TODO 유현체크
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
    
    
    //TODO 안쓸꺼면 삭제
    public String getRepImagePath(String randomIdForImage) {
        ChallengeRepImage cri = imageRepository.findByImageTypeAndChallengeRep("CRI", randomIdForImage);
        return cri.getImagePath();
    }
    //TODO 안쓸꺼면 삭제
    public List<String> getExamImagePath(String randomIdForImage) {
        List<ChallengeExamImage> cei = imageRepository.findByImageTypeAndChallengeExam("CEI", randomIdForImage);
        List<String> urls = new ArrayList<>();
        for (ChallengeExamImage image : cei) {
            urls.add(image.getImagePath());
        }

        return urls;
    }
    /*
     * s3서비스를 대행해주는 역할
     */
    public String getOneImagePath(MultipartFile multipartFile) throws IOException {
        return s3UploadService.uploadJustOne(multipartFile);
    }

}
