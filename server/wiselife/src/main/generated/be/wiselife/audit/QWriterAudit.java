package be.wiselife.audit;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWriterAudit is a Querydsl query type for WriterAudit
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QWriterAudit extends EntityPathBase<WriterAudit> {

    private static final long serialVersionUID = 511257906L;

    public static final QWriterAudit writerAudit = new QWriterAudit("writerAudit");

    public final QTimeAudit _super = new QTimeAudit(this);

    public final StringPath create_by_member = createString("create_by_member");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public final StringPath updated_by_member = createString("updated_by_member");

    public QWriterAudit(String variable) {
        super(WriterAudit.class, forVariable(variable));
    }

    public QWriterAudit(Path<? extends WriterAudit> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWriterAudit(PathMetadata metadata) {
        super(WriterAudit.class, metadata);
    }

}

