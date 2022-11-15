package be.wiselife.quesrydslrepo;

import be.wiselife.follower.entity.Follower;
import be.wiselife.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import static be.wiselife.follower.entity.QFollower.follower;

@RequiredArgsConstructor
public class QuerydslRepositoryImpl implements QuerydslRepository{
    private final JPAQueryFactory queryFactory;


    @Override
    public Follower findByFollowingIdAndFollowerMember(Long followingId, Member followerMember) {
        return queryFactory
                .selectFrom(follower)
                .where(follower.followingId.eq(followingId)
                        .and(follower.member.eq(followerMember)))
                .fetchOne();
    }
}
