package be.wiselife.challengereview.repository;

import be.wiselife.challengereview.entity.ChallengeReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeReviewRepository extends JpaRepository<ChallengeReview, Long> {
    Optional<ChallengeReview> findChallengeReviewByMemberMemberIdAndChallengeChallengeId(Long memberId, Long challengeId);
}
