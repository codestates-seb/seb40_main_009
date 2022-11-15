package be.wiselife.quesrydslrepo;

import be.wiselife.follow.entity.Follow;
import be.wiselife.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static be.wiselife.follow.entity.QFollow.follow;


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
}
//