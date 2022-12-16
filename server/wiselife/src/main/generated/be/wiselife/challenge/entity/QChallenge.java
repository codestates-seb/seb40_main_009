package be.wiselife.challenge.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallenge is a Querydsl query type for Challenge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallenge extends EntityPathBase<Challenge> {

    private static final long serialVersionUID = 2077722374L;

    public static final QChallenge challenge = new QChallenge("challenge");

    public final be.wiselife.audit.QWriterAudit _super = new be.wiselife.audit.QWriterAudit(this);

    public final NumberPath<Long> authorizedMemberId = createNumber("authorizedMemberId", Long.class);

    public final ListPath<String, StringPath> challengeAuthAvailableTime = this.<String, StringPath>createList("challengeAuthAvailableTime", String.class, StringPath.class, PathInits.DIRECT2);

    public final NumberPath<Integer> challengeAuthCycle = createNumber("challengeAuthCycle", Integer.class);

    public final StringPath challengeAuthDescription = createString("challengeAuthDescription");

    public final EnumPath<Challenge.ChallengeCategory> challengeCategory = createEnum("challengeCategory", Challenge.ChallengeCategory.class);

    public final StringPath challengeCertImagePath = createString("challengeCertImagePath");

    public final ListPath<be.wiselife.image.entity.ChallengeCertImage, be.wiselife.image.entity.QChallengeCertImage> challengeCertImages = this.<be.wiselife.image.entity.ChallengeCertImage, be.wiselife.image.entity.QChallengeCertImage>createList("challengeCertImages", be.wiselife.image.entity.ChallengeCertImage.class, be.wiselife.image.entity.QChallengeCertImage.class, PathInits.DIRECT2);

    public final NumberPath<Double> challengeCurrentParty = createNumber("challengeCurrentParty", Double.class);

    public final StringPath challengeDescription = createString("challengeDescription");

    public final StringPath challengeDirectLink = createString("challengeDirectLink");

    public final DatePath<java.time.LocalDate> challengeEndDate = createDate("challengeEndDate", java.time.LocalDate.class);

    public final StringPath challengeExamImagePath = createString("challengeExamImagePath");

    public final NumberPath<Integer> challengeFeePerPerson = createNumber("challengeFeePerPerson", Integer.class);

    public final NumberPath<Long> challengeId = createNumber("challengeId", Long.class);

    public final NumberPath<Integer> challengeMaxParty = createNumber("challengeMaxParty", Integer.class);

    public final NumberPath<Integer> challengeMinParty = createNumber("challengeMinParty", Integer.class);

    public final StringPath challengeRepImagePath = createString("challengeRepImagePath");

    public final ListPath<be.wiselife.challengereview.entity.ChallengeReview, be.wiselife.challengereview.entity.QChallengeReview> challengeReviewList = this.<be.wiselife.challengereview.entity.ChallengeReview, be.wiselife.challengereview.entity.QChallengeReview>createList("challengeReviewList", be.wiselife.challengereview.entity.ChallengeReview.class, be.wiselife.challengereview.entity.QChallengeReview.class, PathInits.DIRECT2);

    public final DatePath<java.time.LocalDate> challengeStartDate = createDate("challengeStartDate", java.time.LocalDate.class);

    public final NumberPath<Double> challengeSuccessCount = createNumber("challengeSuccessCount", Double.class);

    public final NumberPath<Double> challengeSuccessRate = createNumber("challengeSuccessRate", Double.class);

    public final ListPath<be.wiselife.challengetalk.entity.ChallengeTalk, be.wiselife.challengetalk.entity.QChallengeTalk> challengeTalkList = this.<be.wiselife.challengetalk.entity.ChallengeTalk, be.wiselife.challengetalk.entity.QChallengeTalk>createList("challengeTalkList", be.wiselife.challengetalk.entity.ChallengeTalk.class, be.wiselife.challengetalk.entity.QChallengeTalk.class, PathInits.DIRECT2);

    public final StringPath challengeTitle = createString("challengeTitle");

    public final NumberPath<Double> challengeTotalReward = createNumber("challengeTotalReward", Double.class);

    public final NumberPath<Integer> challengeViewCount = createNumber("challengeViewCount", Integer.class);

    //inherited
    public final StringPath create_by_member = _super.create_by_member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final BooleanPath isClosed = createBoolean("isClosed");

    public final SetPath<be.wiselife.memberchallenge.entity.MemberChallenge, be.wiselife.memberchallenge.entity.QMemberChallenge> memberChallenges = this.<be.wiselife.memberchallenge.entity.MemberChallenge, be.wiselife.memberchallenge.entity.QMemberChallenge>createSet("memberChallenges", be.wiselife.memberchallenge.entity.MemberChallenge.class, be.wiselife.memberchallenge.entity.QMemberChallenge.class, PathInits.DIRECT2);

    public final NumberPath<Integer> memberChallengeTodayCertCount = createNumber("memberChallengeTodayCertCount", Integer.class);

    public final StringPath randomIdForImage = createString("randomIdForImage");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updated_at = _super.updated_at;

    //inherited
    public final StringPath updated_by_member = _super.updated_by_member;

    public QChallenge(String variable) {
        super(Challenge.class, forVariable(variable));
    }

    public QChallenge(Path<? extends Challenge> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChallenge(PathMetadata metadata) {
        super(Challenge.class, metadata);
    }

}

