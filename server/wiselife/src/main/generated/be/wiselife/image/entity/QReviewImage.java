package be.wiselife.image.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReviewImage is a Querydsl query type for ReviewImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReviewImage extends EntityPathBase<ReviewImage> {

    private static final long serialVersionUID = 1594101838L;

    public static final QReviewImage reviewImage = new QReviewImage("reviewImage");

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

    public QReviewImage(String variable) {
        super(ReviewImage.class, forVariable(variable));
    }

    public QReviewImage(Path<? extends ReviewImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReviewImage(PathMetadata metadata) {
        super(ReviewImage.class, metadata);
    }

}

