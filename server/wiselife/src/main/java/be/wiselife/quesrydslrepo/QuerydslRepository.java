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
    ChallengeExamImage findByImageTypeAndImagePathAndChallengeExam(String imageType, String imagePath, String randomIdForImage);
    List<ChallengeCertImage> findByImageTypeAndMemberIdAndChallengeCertId(String imageType, Long memberId, String randomIdForImage);

    List<Order> findByMemberId(Member member);

}
