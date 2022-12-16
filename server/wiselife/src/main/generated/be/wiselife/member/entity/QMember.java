package be.wiselife.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 1350734324L;

    public static final QMember member = new QMember("member1");

    public final be.wiselife.audit.QTimeAudit _super = new be.wiselife.audit.QTimeAudit(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Integer> followerCount = createNumber("followerCount", Integer.class);

    public final NumberPath<Integer> followers = createNumber("followers", Integer.class);

    public final SetPath<be.wiselife.follow.entity.Follow, be.wiselife.follow.entity.QFollow> follows = this.<be.wiselife.follow.entity.Follow, be.wiselife.follow.entity.QFollow>createSet("follows", be.wiselife.follow.entity.Follow.class, be.wiselife.follow.entity.QFollow.class, PathInits.DIRECT2);

    public final EnumPath<Member.FollowStatus> followStatus = createEnum("followStatus", Member.FollowStatus.class);

    public final BooleanPath hasRedCard = createBoolean("hasRedCard");

    public final EnumPath<Member.MemberBadge> memberBadge = createEnum("memberBadge", Member.MemberBadge.class);

    public final NumberPath<Double> memberChallengePercentage = createNumber("memberChallengePercentage", Double.class);

    public final ListPath<be.wiselife.memberchallenge.entity.MemberChallenge, be.wiselife.memberchallenge.entity.QMemberChallenge> memberChallenges = this.<be.wiselife.memberchallenge.entity.MemberChallenge, be.wiselife.memberchallenge.entity.QMemberChallenge>createList("memberChallenges", be.wiselife.memberchallenge.entity.MemberChallenge.class, be.wiselife.memberchallenge.entity.QMemberChallenge.class, PathInits.DIRECT2);

    public final StringPath memberDescription = createString("memberDescription");

    public final StringPath memberEmail = createString("memberEmail");

    public final NumberPath<Integer> memberExp = createNumber("memberExp", Integer.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath memberImagePath = createString("memberImagePath");

    public final NumberPath<Integer> memberLevel = createNumber("memberLevel", Integer.class);

    public final NumberPath<Double> memberMoney = createNumber("memberMoney", Double.class);

    public final StringPath memberName = createString("memberName");

    public final SetPath<be.wiselife.order.entity.Order, be.wiselife.order.entity.QOrder> orders = this.<be.wiselife.order.entity.Order, be.wiselife.order.entity.QOrder>createSet("orders", be.wiselife.order.entity.Order.class, be.wiselife.order.entity.QOrder.class, PathInits.DIRECT2);

    public final StringPath provider = createString("provider");

    public final StringPath providerId = createString("providerId");

    public final StringPath refreshToken = createString("refreshToken");

    public final SetPath<String, StringPath> roles = this.<String, StringPath>createSet("roles", String.class, StringPath.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

