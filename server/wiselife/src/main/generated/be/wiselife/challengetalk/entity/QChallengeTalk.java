package be.wiselife.challengetalk.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallengeTalk is a Querydsl query type for ChallengeTalk
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeTalk extends EntityPathBase<ChallengeTalk> {

    private static final long serialVersionUID = 1943632806L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChallengeTalk challengeTalk = new QChallengeTalk("challengeTalk");

    public final be.wiselife.audit.QWriterAudit _super = new be.wiselife.audit.QWriterAudit(this);

    public final be.wiselife.challenge.entity.QChallenge challenge;

    public final StringPath challengeTalkBody = createString("challengeTalkBody");

    public final NumberPath<Long> challengeTalkId = createNumber("challengeTalkId", Long.class);

    //inherited
    public final StringPath create_by_member = _super.create_by_member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath memberBadge = createString("memberBadge");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    //inherited
    public final StringPath updated_by_member = _super.updated_by_member;

    public QChallengeTalk(String variable) {
        this(ChallengeTalk.class, forVariable(variable), INITS);
    }

    public QChallengeTalk(Path<? extends ChallengeTalk> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChallengeTalk(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChallengeTalk(PathMetadata metadata, PathInits inits) {
        this(ChallengeTalk.class, metadata, inits);
    }

    public QChallengeTalk(Class<? extends ChallengeTalk> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new be.wiselife.challenge.entity.QChallenge(forProperty("challenge")) : null;
    }

}

