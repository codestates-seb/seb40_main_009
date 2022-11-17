package be.wiselife.quesrydslrepo;

import be.wiselife.follow.entity.Follow;
import be.wiselife.member.entity.Member;
import be.wiselife.order.entity.Order;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static be.wiselife.follow.entity.QFollow.follow;
import static be.wiselife.order.entity.QOrder.order;

@RequiredArgsConstructor
public class QuerydslRepositoryImpl implements QuerydslRepository{
    private final JPAQueryFactory queryFactory;


    @Override
    public Follow findByFollowerIdAndFollowing(Long followerId, Member following) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.followerId.eq(followerId)
                        .and(follow.following.eq(following)))
                .fetchOne();
    }

    @Override
    public List<Order> findByMemberId(Member member) { //성공한 결재내역만 보이게 출력
        return queryFactory
                .selectFrom(order)
                .where(order.member.eq(member)
                        .and(order.orderSuccess.isTrue()))
                .fetch();
    }
}
