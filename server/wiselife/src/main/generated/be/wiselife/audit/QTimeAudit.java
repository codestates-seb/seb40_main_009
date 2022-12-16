package be.wiselife.audit;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTimeAudit is a Querydsl query type for TimeAudit
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QTimeAudit extends EntityPathBase<TimeAudit> {

    private static final long serialVersionUID = -1798413928L;

    public static final QTimeAudit timeAudit = new QTimeAudit("timeAudit");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> updated_at = createDateTime("updated_at", java.time.LocalDateTime.class);

    public QTimeAudit(String variable) {
        super(TimeAudit.class, forVariable(variable));
    }

    public QTimeAudit(Path<? extends TimeAudit> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTimeAudit(PathMetadata metadata) {
        super(TimeAudit.class, metadata);
    }

}

