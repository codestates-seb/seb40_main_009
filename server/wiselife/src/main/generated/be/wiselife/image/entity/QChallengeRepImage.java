package be.wiselife.image.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QChallengeRepImage is a Querydsl query type for ChallengeRepImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeRepImage extends EntityPathBase<ChallengeRepImage> {

    private static final long serialVersionUID = 345351020L;

    public static final QChallengeRepImage challengeRepImage = new QChallengeRepImage("challengeRepImage");

    public final QImage _super = new QImage(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DatePath<java.time.LocalDate> createDay = _super.createDay;

    //inherited
    public final NumberPath<Long> imageId = _super.imageId;

    //inherited
    public final StringPath imagePath = _super.imagePath;

    public final StringPath imageType = createString("imageType");

    public final StringPath randomIdForImage = createString("randomIdForImage");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public QChallengeRepImage(String variable) {
        super(ChallengeRepImage.class, forVariable(variable));
    }

    public QChallengeRepImage(Path<? extends ChallengeRepImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChallengeRepImage(PathMetadata metadata) {
        super(ChallengeRepImage.class, metadata);
    }

}

