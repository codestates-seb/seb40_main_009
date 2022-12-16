package be.wiselife.challengereview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallengeReview is a Querydsl query type for ChallengeReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeReview extends EntityPathBase<ChallengeReview> {

    private static final long serialVersionUID = 2098408358L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChallengeReview challengeReview = new QChallengeReview("challengeReview");

    public final be.wiselife.audit.QWriterAudit _super = new be.wiselife.audit.QWriterAudit(this);

    public final be.wiselife.challenge.entity.QChallenge challenge;

    public final StringPath challengeReviewContent = createString("challengeReviewContent");

    public final NumberPath<Long> challengeReviewId = createNumber("challengeReviewId", Long.class);

    public final StringPath challengeReviewImagePath = createString("challengeReviewImagePath");

    public final NumberPath<Integer> challengeReviewStar = createNumber("challengeReviewStar", Integer.class);

    public final StringPath challengeReviewTitle = createString("challengeReviewTitle");

    //inherited
    public final StringPath create_by_member = _super.create_by_member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final be.wiselife.member.entity.QMember member;

    public final StringPath reviewRandomId = createString("reviewRandomId");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    //inherited
    public final StringPath updated_by_member = _super.updated_by_member;

    public QChallengeReview(String variable) {
        this(ChallengeReview.class, forVariable(variable), INITS);
    }

    public QChallengeReview(Path<? extends ChallengeReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChallengeReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChallengeReview(PathMetadata metadata, PathInits inits) {
        this(ChallengeReview.class, metadata, inits);
    }

    public QChallengeReview(Class<? extends ChallengeReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new be.wiselife.challenge.entity.QChallenge(forProperty("challenge")) : null;
        this.member = inits.isInitialized("member") ? new be.wiselife.member.entity.QMember(forProperty("member")) : null;
    }

}

