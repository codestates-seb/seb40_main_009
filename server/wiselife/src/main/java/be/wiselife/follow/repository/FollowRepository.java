package be.wiselife.follow.repository;

import be.wiselife.follow.entity.Follow;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long>, QuerydslRepository {

}
