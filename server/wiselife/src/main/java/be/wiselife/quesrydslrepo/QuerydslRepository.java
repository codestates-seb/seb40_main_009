package be.wiselife.quesrydslrepo;


import be.wiselife.follow.entity.Follow;
import be.wiselife.image.entity.*;
import be.wiselife.member.entity.Member;
import be.wiselife.order.entity.Order;

import java.util.List;

import java.time.LocalDateTime;
import java.util.List;

public interface QuerydslRepository {
    Follow findByFollowerIdAndFollowing(Long followingId, Member follower);
    MemberImage findByImageTypeAndMemberId(String imageType, Long memberId);
    ReviewImage findByImageTypeAndReviewId(String imageType, Long reviewId);
    ChallengeRepImage findByImageTypeAndChallengeRep(String imageType, String randomIdForImage);
    List<ChallengeExamImage> findByImageTypeAndChallengeExam(String imageType, String randomIdForImage);

    // 한 이미지를 상세로 보려고 할때 필요할지 프론트에 질문 필요
    ChallengeExamImage findByImageTypeAndImagePathAndChallengeExam(String imageType, String imagePath, String randomIdForImage);

    // 인증사진이 당일에 몇장 등록됐는지 확인용
    List<ChallengeCertImage> findByImageTypeAndMemberIdAndChallengeCertIdPost(String imageType, Long memberId, String randomIdForImage);

    // 인증사진 중 현재 인증가능 시간에 수정을 가능하게 하는 메소드
    ChallengeCertImage findByImageTypeAndMemberIdAndChallengeCertIdPatch(String imageType, Long memberId, String randomIdForImage);

    // 챌린지 참여자가 챌린지를 봤을때
    List<ChallengeCertImage> findByImageTypeAndMemberIdAndChallengeCertIdGet(String imageType, Long memberId, String randomIdForImage);

    List<Order> findByMemberId(Member member);

}
