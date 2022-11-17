package be.wiselife.quesrydslrepo;


import be.wiselife.follow.entity.Follow;
import be.wiselife.member.entity.Member;
import be.wiselife.order.entity.Order;

import java.util.List;

public interface QuerydslRepository {
    Follow findByFollowerIdAndFollowing(Long followingId, Member follower);

    List<Order> findByMemberId(Member member);
}
