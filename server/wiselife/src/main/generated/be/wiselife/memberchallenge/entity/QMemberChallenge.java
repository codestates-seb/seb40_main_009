package be.wiselife.memberchallenge.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberChallenge is a Querydsl query type for MemberChallenge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberChallenge extends EntityPathBase<MemberChallenge> {

    private static final long serialVersionUID = -2077196378L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberChallenge memberChallenge = new QMemberChallenge("memberChallenge");

    public final be.wiselife.challenge.entity.QChallenge challenge;

    public final NumberPath<Double> expectedRefundToMember = createNumber("expectedRefundToMember", Double.class);

    public final be.wiselife.member.entity.QMember member;

    public final NumberPath<Long> memberChallengeId = createNumber("memberChallengeId", Long.class);

    public final NumberPath<Double> memberChallengeSuccessRate = createNumber("memberChallengeSuccessRate", Double.class);

    public final NumberPath<Double> memberSuccessDay = createNumber("memberSuccessDay", Double.class);

    public QMemberChallenge(String variable) {
        this(MemberChallenge.class, forVariable(variable), INITS);
    }

    public QMemberChallenge(Path<? extends MemberChallenge> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberChallenge(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberChallenge(PathMetadata metadata, PathInits inits) {
        this(MemberChallenge.class, metadata, inits);
    }

    public QMemberChallenge(Class<? extends MemberChallenge> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new be.wiselife.challenge.entity.QChallenge(forProperty("challenge")) : null;
        this.member = inits.isInitialized("member") ? new be.wiselife.member.entity.QMember(forProperty("member")) : null;
    }

}

