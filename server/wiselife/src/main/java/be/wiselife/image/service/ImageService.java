package be.wiselife.image.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.image.entity.ChallengeRepImage;
import be.wiselife.image.entity.Image;
import be.wiselife.image.entity.MemberImage;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
                imageRepository.findByImageTypeAndChallengeRepId("CRI", challenge.getRandomIdForImage());

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
}
