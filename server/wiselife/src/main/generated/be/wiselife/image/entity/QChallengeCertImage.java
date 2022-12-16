package be.wiselife.image.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallengeCertImage is a Querydsl query type for ChallengeCertImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeCertImage extends EntityPathBase<ChallengeCertImage> {

    private static final long serialVersionUID = 2136158889L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChallengeCertImage challengeCertImage = new QChallengeCertImage("challengeCertImage");

    public final QImage _super = new QImage(this);

    public final be.wiselife.challenge.entity.QChallenge challenge;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DatePath<java.time.LocalDate> createDay = _super.createDay;

    //inherited
    public final NumberPath<Long> imageId = _super.imageId;

    //inherited
    public final StringPath imagePath = _super.imagePath;

    public final StringPath imageType = createString("imageType");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath randomIdForImage = createString("randomIdForImage");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public QChallengeCertImage(String variable) {
        this(ChallengeCertImage.class, forVariable(variable), INITS);
    }

    public QChallengeCertImage(Path<? extends ChallengeCertImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChallengeCertImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChallengeCertImage(PathMetadata metadata, PathInits inits) {
        this(ChallengeCertImage.class, metadata, inits);
    }

    public QChallengeCertImage(Class<? extends ChallengeCertImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new be.wiselife.challenge.entity.QChallenge(forProperty("challenge")) : null;
    }

}

