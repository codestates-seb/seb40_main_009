package be.wiselife.challenge.repository;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

import static be.wiselife.member.entity.QMember.member;

public interface ChallengeRepository extends JpaRepository<Challenge, Long>, QuerydslRepository {
    Optional<Page<Challenge>> findChallengesByChallengeCategory(Challenge.ChallengeCategory challengeCategory, Pageable pageable);
    Optional<List<Challenge>> findChallengesByChallengeCategoryOrderByCreatedAtDesc(Challenge.ChallengeCategory challengeCategory);
    Optional<Page<Challenge>> findChallengesByChallengeTitleContaining(String challengeTitle, Pageable pageable);
    Optional<List<Challenge>> findChallengesByIsClosed(boolean IsClosed);
    @Lock(value = LockModeType.PESSIMISTIC_READ)
    MemberChallenge countSave(Challenge beforeChallenge, Member beforeMember);
}
