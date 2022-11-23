package be.wiselife.quesrydslrepo;


import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.entity.*;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.order.entity.Order;

import java.util.List;

import java.time.LocalDateTime;
import java.util.List;

public interface QuerydslRepository {
    Follow findByFollowerIdAndFollowing(Long followingId, Member follower);

    // 멤버가 참여한 챌린지 중 성공여부 확인 및 멤버 페이지 내에서 챌린지 종료와 생성일자에 따른 sort 용
    List<MemberChallenge> findByMember(Member member);

    MemberChallenge findByChallengeIdAndMember(String challengeId, Member member);
    MemberImage findByImageTypeAndMemberId(String imageType, Long memberId);
    ChallengeRepImage findByImageTypeAndChallengeRep(String imageType, String randomIdForImage);
    List<ChallengeExamImage> findByImageTypeAndChallengeExam(String imageType, String randomIdForImage);

    // 한 이미지를 상세로 보려고 할때 필요할지 프론트에 질문 필요
    ChallengeExamImage findByImageTypeAndImagePathAndChallengeExam(String imageType, String imagePath, String randomIdForImage);

    // 인증사진이 당일에 몇장 등록됐는지 확인용
    List<ChallengeCertImage> findByImageTypeAndMemberIdAndChallengeCertIdCount(String imageType, Long memberId, String randomIdForImage);

    // 인증사진 중 현재 인증가능 시간에 수정을 가능하게 하는 메소드
    ChallengeCertImage findByImageTypeAndMemberIdAndChallengeCertIdPatch(String imageType, Long memberId, String randomIdForImage);

    // 챌린지 참여자가 챌린지를 봤을때
    List<ChallengeCertImage> findByImageTypeAndChallengeCertIdGet(String imageType,String randomIdForImage);

    // 리뷰 이미지 등록 및 수정 할때
    ReviewImage findByImageTypeAndReviewImageId(String imageType, String randomIdForImage);

    List<Order> findByMemberId(Member member);

    //회원이 해당 챌린지에 포함된 회원이 맞는지 판단하는 메소드
    MemberChallenge findByChallengeAndMember(Challenge challenge,Member member);

    List<Member> searchMemberName(String memberName);

}
