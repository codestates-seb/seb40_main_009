package be.wiselife.order.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrder is a Querydsl query type for Order
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrder extends EntityPathBase<Order> {

    private static final long serialVersionUID = -237285402L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrder order = new QOrder("order1");

    public final be.wiselife.audit.QTimeAudit _super = new be.wiselife.audit.QTimeAudit(this);

    public final StringPath approved_at = createString("approved_at");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath itemName = createString("itemName");

    public final be.wiselife.member.entity.QMember member;

    public final NumberPath<Long> orderId = createNumber("orderId", Long.class);

    public final BooleanPath orderSuccess = createBoolean("orderSuccess");

    public final NumberPath<Integer> orderTax = createNumber("orderTax", Integer.class);

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public final StringPath requestuniquenumber = createString("requestuniquenumber");

    public final StringPath tid = createString("tid");

    public final NumberPath<Double> totalAmount = createNumber("totalAmount", Double.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    public QOrder(String variable) {
        this(Order.class, forVariable(variable), INITS);
    }

    public QOrder(Path<? extends Order> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrder(PathMetadata metadata, PathInits inits) {
        this(Order.class, metadata, inits);
    }

    public QOrder(Class<? extends Order> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new be.wiselife.member.entity.QMember(forProperty("member")) : null;
    }

}

