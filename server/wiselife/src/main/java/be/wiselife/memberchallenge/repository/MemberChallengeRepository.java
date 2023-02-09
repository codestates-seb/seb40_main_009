package be.wiselife.memberchallenge.repository;

import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberChallengeRepository extends JpaRepository<MemberChallenge,Long>, QuerydslRepository {
    Optional<MemberChallenge> findMemberChallengeByChallengeChallengeIdAndMemberMemberId(Long challengeId, Long memberId);
}
