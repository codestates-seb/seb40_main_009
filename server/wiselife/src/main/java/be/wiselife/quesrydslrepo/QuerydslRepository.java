package be.wiselife.quesrydslrepo;


import be.wiselife.follow.entity.Follow;
import be.wiselife.image.entity.*;
import be.wiselife.member.entity.Member;

import java.time.LocalDateTime;
import java.util.List;

public interface QuerydslRepository {
    Follow findByFollowerIdAndFollowing(Long followingId, Member follower);

    MemberImage findByImageTypeAndMemberId(String imageType, Long memberId);
    ReviewImage findByImageTypeAndReviewId(String imageType, Long reviewId);
    ChallengeRepImage findByImageTypeAndChallengeRandomId(String imageType, String randomIdForImage);
    List<ChallengeExamImage> findByImageTypeAndChallengeExamId(String imageType, String randomIdForImage);
    List<ChallengeCertImage> findByImageTypeAndChallengeCertId(String imageType, Long createAt);
}
