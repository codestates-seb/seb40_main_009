package be.wiselife.image.service;

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

    /**
     * 사진을 수정한 멤버 이미지를 받는다.
     * 카카오톡 이미지 외에 등록한적이 없다면, 새로 memberImage를 생성해서 저장
     * 카카오톡 이미지 외에 등록한적이 있다면, 기존것을 db에서 찾아서 수정
     */
    public void patchMemberImage(Member member) {
        MemberImage memberImageFromRepository = imageRepository.findByImageTypeAndMemberId("MI", member.getMemberId());
        if (memberImageFromRepository == null) {
            log.info("image active1");
            MemberImage memberImage = new MemberImage();
            saveMemberImage(member, memberImage);
        } else {
            log.info("image active2");
            saveMemberImage(member, memberImageFromRepository);
        }
    }

    // saveMemberImage 중복코드 줄이는 용도
    private void saveMemberImage(Member member, MemberImage memberImage) {
        memberImage.setImagePath(member.getMemberImagePath());
        memberImage.setMemberId(member.getMemberId());
        imageRepository.save(memberImage);
    }
}
