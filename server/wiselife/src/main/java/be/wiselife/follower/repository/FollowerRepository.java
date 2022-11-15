package be.wiselife.follower.repository;

import be.wiselife.follower.entity.Follower;
import be.wiselife.member.entity.Member;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowerRepository extends JpaRepository<Follower,Long>, QuerydslRepository {

}
