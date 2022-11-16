package be.wiselife.quesrydslrepo;


import be.wiselife.follow.entity.Follow;
import be.wiselife.member.entity.Member;

public interface QuerydslRepository {
    Follow findByFollowerIdAndFollowing(Long followingId, Member follower);
}
