package be.wiselife.challenge.repository;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long>, QuerydslRepository {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public Optional<Challenge> findById(Long challengeId);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="10000")})
    public Challenge save(Challenge challenge);

    Optional<Page<Challenge>> findChallengesByChallengeCategory(Challenge.ChallengeCategory challengeCategory, Pageable pageable);
    Optional<List<Challenge>> findChallengesByChallengeCategoryOrderByCreatedAtDesc(Challenge.ChallengeCategory challengeCategory);
    Optional<Page<Challenge>> findChallengesByChallengeTitleContaining(String challengeTitle, Pageable pageable);
    Optional<List<Challenge>> findChallengesByIsClosed(boolean IsClosed);
}
