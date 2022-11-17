package be.wiselife.image.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.image.entity.ChallengeExamImage;
import be.wiselife.image.entity.ChallengeRepImage;
import be.wiselife.image.entity.Image;
import be.wiselife.image.entity.MemberImage;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    //MemberImage 부분 코드======================================
    /**
     * 사진을 수정한 멤버 이미지를 받는다.
     * 카카오톡 이미지 외에 등록한적이 없다면, 새로 memberImage를 생성해서 저장
     * 카카오톡 이미지 외에 등록한적이 있다면, 기존것을 db에서 찾아서 수정
     */
    public void patchMemberImage(Member member) {
        MemberImage memberImageFromRepository =
                imageRepository.findByImageTypeAndMemberId("MI", member.getMemberId());
        if (memberImageFromRepository == null) {
            MemberImage memberImage = new MemberImage();
            saveMemberImage(member, memberImage);
        } else {
            saveMemberImage(member, memberImageFromRepository);
        }
    }

    // MemberImage 중복코드 줄이는 용도
    private void saveMemberImage(Member member, MemberImage memberImage) {
        memberImage.setImagePath(member.getMemberImagePath());
        memberImage.setMemberId(member.getMemberId());
        imageRepository.save(memberImage);
    }

    //ChallengeRepImage 부분 코드======================================
    public void patchChallengeRepImage(Challenge challenge) {
        ChallengeRepImage challengeRepImageFromRepository =
                imageRepository.findByImageTypeAndChallengeRep("CRI", challenge.getRandomIdForImage());

        if (challengeRepImageFromRepository == null) {
            ChallengeRepImage challengeRepImage = new ChallengeRepImage();
            saveChallengeRepImage(challenge, challengeRepImage);
        } else {
            saveChallengeRepImage(challenge,challengeRepImageFromRepository);
        }
    }
    // ChallengeRepImage 중복코드 줄이는 용도
    private void saveChallengeRepImage(Challenge challenge, ChallengeRepImage challengeRepImage) {
        challengeRepImage.setImagePath(challenge.getChallengeRepImagePath());
        challengeRepImage.setRandomIdForImage(challenge.getRandomIdForImage());
        imageRepository.save(challengeRepImage);
    }

    //ChallengeExamImage 부분 코드======================================
    public void postChallengeExamImage(Challenge challenge) {

        String[] imagePaths = challenge.getChallengeExamImagePath().split(",");
        for (String imagePath : imagePaths) {
            ChallengeExamImage challengeExamImage = new ChallengeExamImage();
            challengeExamImage.setImagePath(imagePath);
            challengeExamImage.setRandomIdForImage(challenge.getRandomIdForImage());
            imageRepository.save(challengeExamImage);
        }
    }

    public String patchChallengeExamImage(Challenge challenge) {
        List<ChallengeExamImage> challengeExamImages
                = imageRepository.findByImageTypeAndChallengeExam("CEI", challenge.getRandomIdForImage());
        String[] imagePath = challenge.getChallengeExamImagePath().split(",");
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
            changeImagePath = changeChallengeExamImage.getImagePath() + ",";
        }
        return changeImagePath;
    }
}
