package be.wiselife.image.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QChallengeExamImage is a Querydsl query type for ChallengeExamImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeExamImage extends EntityPathBase<ChallengeExamImage> {

    private static final long serialVersionUID = -833189490L;

    public static final QChallengeExamImage challengeExamImage = new QChallengeExamImage("challengeExamImage");

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

    public QChallengeExamImage(String variable) {
        super(ChallengeExamImage.class, forVariable(variable));
    }

    public QChallengeExamImage(Path<? extends ChallengeExamImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChallengeExamImage(PathMetadata metadata) {
        super(ChallengeExamImage.class, metadata);
    }

}

