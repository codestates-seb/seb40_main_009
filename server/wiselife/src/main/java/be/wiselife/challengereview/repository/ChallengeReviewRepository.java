package be.wiselife.challengereview.repository;

import be.wiselife.challengereview.entity.ChallengeReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeReviewRepository extends JpaRepository<ChallengeReview, Long> {
}
