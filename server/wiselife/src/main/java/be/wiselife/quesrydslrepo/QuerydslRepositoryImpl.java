package be.wiselife.quesrydslrepo;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.entity.*;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.order.entity.Order;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import static be.wiselife.follow.entity.QFollow.follow;
import static be.wiselife.image.entity.QMemberImage.*;
import static be.wiselife.image.entity.QReviewImage.*;
import static be.wiselife.image.entity.QChallengeRepImage.*;
import static be.wiselife.image.entity.QChallengeExamImage.*;
import static be.wiselife.image.entity.QChallengeCertImage.*;
import static be.wiselife.memberchallenge.entity.QMemberChallenge.*;

import static be.wiselife.follow.entity.QFollow.follow;
import static be.wiselife.order.entity.QOrder.order;
import static be.wiselife.member.entity.QMember.member;

@RequiredArgsConstructor
public class QuerydslRepositoryImpl implements QuerydslRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public Follow findByFollowerIdAndFollowing(Long followerId, Member following) {
        return queryFactory
                .selectFrom(follow)
                .where(follow.followerId.eq(followerId)
                        .and(follow.following.eq(following)))
                .fetchOne();
    }

    @Override
    public List<MemberChallenge> findMemberChallengeByMember(Member member) {
        return queryFactory
                .selectFrom(memberChallenge)
                .where(memberChallenge.member.eq(member))
                .orderBy(memberChallenge.challenge.isClosed.asc(), memberChallenge.memberChallengeId.desc())
                .fetch();
    }

    @Override
    public MemberChallenge findByChallengeIdAndMember(String challengeId, Member member) {

        return queryFactory
                .selectFrom(memberChallenge)
                .where(memberChallenge.challenge.randomIdForImage.eq(challengeId)
                        .and(memberChallenge.member.eq(member)))
                .fetchOne();
    }


    @Override
    public MemberImage findByImageTypeAndMemberId(String imageType, Long memberId) {
        return queryFactory
                .selectFrom(memberImage)
                .where(memberImage.imageType.eq(imageType)
                        .and(memberImage.memberId.eq(memberId)))
                .fetchOne();
    }

    @Override
    public ChallengeRepImage findByImageTypeAndChallengeRep(String imageType, String randomIdForImage) {
        return queryFactory
                .selectFrom(challengeRepImage)
                .where(challengeRepImage.imageType.eq(imageType)
                        .and(challengeRepImage.randomIdForImage.eq(randomIdForImage)))
                .fetchOne();
    }

    @Override
    public List<ChallengeExamImage> findByImageTypeAndChallengeExam(String imageType, String randomIdForImage) {
        return queryFactory
                .selectFrom(challengeExamImage)
                .where(challengeExamImage.imageType.eq(imageType)
                        .and(challengeExamImage.randomIdForImage.eq(randomIdForImage)))
                .fetch();
    }

    @Override
    public ChallengeExamImage findByImageTypeAndImagePathAndChallengeExam(String imageType, String imagePath, String randomIdForImage) {
        return queryFactory
                .selectFrom(challengeExamImage)
                .where(challengeExamImage.imageType.eq(imageType)
                        .and(challengeExamImage.imagePath.eq(imagePath))
                        .and(challengeExamImage.randomIdForImage.eq(randomIdForImage)))
                .fetchOne();
    }

    // https://green-joo.tistory.com/51
    @Override
    public List<ChallengeCertImage> findByImageTypeAndMemberIdAndChallengeCertIdCount(String imageType, Long memberId, String randomIdForImage) {

        LocalDate now = LocalDate.now();
        return queryFactory
                .selectFrom(challengeCertImage)
                .where(challengeCertImage.imageType.eq(imageType)
                        .and(challengeCertImage.memberId.eq(memberId))
                        .and(challengeCertImage.randomIdForImage.eq(randomIdForImage)) // 필드명 imageSource로 변경
                        .and(challengeCertImage.createDay.eq(now))) // localDateTime에
                .orderBy(challengeCertImage.createdAt.desc())
                .fetch();
    }

    /**
     * 현재는 테스트를 위해서 최초 생성시간하고 정확히 같게 설정해둠
     * TODO:실운영에는 일자가 같은게 검색되게 변경 필요
     */
    @Override
    public ChallengeCertImage findByImageTypeAndMemberIdAndChallengeCertIdPatch(String imageType, Long memberId, String randomIdForImage) {
        LocalDate now = LocalDate.now();
        return queryFactory
                .selectFrom(challengeCertImage)
                .where(challengeCertImage.imageType.eq(imageType)
                        .and(challengeCertImage.memberId.eq(memberId))
                        .and(challengeCertImage.randomIdForImage.eq(randomIdForImage))
                        .and(challengeCertImage.createDay.eq(now))
                        .and(challengeCertImage.createdAt.milliSecond().eq(LocalDateTime.now().getSecond())))
                .orderBy(challengeCertImage.createdAt.desc())
                .fetchOne();
    }

    @Override
    public List<ChallengeCertImage> findByImageTypeAndChallengeCertIdGet(String imageType,String randomIdForImage) {
        return queryFactory
                .selectFrom(challengeCertImage)
                .where(challengeCertImage.imageType.eq(imageType)
                        .and(challengeCertImage.randomIdForImage.eq(randomIdForImage)))
                .orderBy(challengeCertImage.createdAt.desc())
                .fetch();
    }

    @Override
    public List<ChallengeCertImage> findCertImageByImageTypeAndMemberId(String imageType, Long memberId) {
        return queryFactory
                .selectFrom(challengeCertImage)
                .where(challengeCertImage.imageType.eq(imageType)
                        .and(challengeCertImage.memberId.eq(memberId)))
                .orderBy(challengeCertImage.createdAt.desc())
                .fetch();
    }

    @Override
    public ReviewImage findByImageTypeAndReviewImageId(String imageType, String randomIdForImage) {
        return queryFactory
                .selectFrom(reviewImage)
                .where(reviewImage.imageType.eq(imageType)
                        .and(reviewImage.randomIdForImage.eq(randomIdForImage)))
                .fetchOne();
    }


    /**
     * @return 오더테이블에서 맴버아이디를 기반으로 성공한 결재내역만 보이게 출력
     */
    @Override
    public List<Order> findByMemberId(Member member) {

        return queryFactory
                .selectFrom(order)
                .where(order.member.eq(member)
                        .and(order.orderSuccess.isTrue()))
                .fetch();
    }

    @Override
    public MemberChallenge findByChallengeAndMember(Challenge challenge, Member member) {
        return queryFactory
                .selectFrom(memberChallenge)
                .where(memberChallenge.challenge.eq(challenge)
                        .and(memberChallenge.member.eq(member)))
                .fetchOne();
    }

    @Override
    public List<Member> searchMemberName(String memberName) {
        return queryFactory
                .selectFrom(member)
                .where(member.memberName.contains(memberName))
                .orderBy(member.createdAt.desc())
                .fetch();
    }
}
