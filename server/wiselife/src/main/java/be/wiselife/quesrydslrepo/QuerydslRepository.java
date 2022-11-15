package be.wiselife.quesrydslrepo;


import be.wiselife.follower.entity.Follower;
import be.wiselife.member.entity.Member;

public interface QuerydslRepository {
    Follower findByFollowingIdAndFollowerMember(Long followingId, Member followerMEmber);
}
