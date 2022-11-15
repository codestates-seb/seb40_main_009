package be.wiselife.quesrydslrepo;


import be.wiselife.follower.entity.Follower;
import be.wiselife.member.entity.Member;

public interface QuerydslRepository {
    Follower findByFollowerMemberIdAndFollowingMember(Long followingId, Member followerMEmber);
}
