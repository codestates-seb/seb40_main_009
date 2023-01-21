package be.wiselife.challenge.repository;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long>, QuerydslRepository {
    Optional<Page<Challenge>> findChallengesByChallengeCategory(Challenge.ChallengeCategory challengeCategory, Pageable pageable);
    Optional<List<Challenge>> findChallengesByChallengeCategoryOrderByCreatedAtDesc(Challenge.ChallengeCategory challengeCategory);
    Optional<Page<Challenge>> findChallengesByChallengeTitleContaining(String challengeTitle, Pageable pageable);
    Optional<List<Challenge>> findChallengesByIsClosed(boolean IsClosed);
}
