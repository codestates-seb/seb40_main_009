package be.wiselife.memberchallenge.repository;

import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberChallengeRepository extends JpaRepository<MemberChallenge,Long>, QuerydslRepository {

}
