package be.wiselife.image.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberImage is a Querydsl query type for MemberImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberImage extends EntityPathBase<MemberImage> {

    private static final long serialVersionUID = 1618228812L;

    public static final QMemberImage memberImage = new QMemberImage("memberImage");

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

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public QMemberImage(String variable) {
        super(MemberImage.class, forVariable(variable));
    }

    public QMemberImage(Path<? extends MemberImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberImage(PathMetadata metadata) {
        super(MemberImage.class, metadata);
    }

}

