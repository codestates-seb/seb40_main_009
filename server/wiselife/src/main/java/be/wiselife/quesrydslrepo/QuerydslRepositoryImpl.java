package be.wiselife.quesrydslrepo;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.entity.*;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.order.entity.Order;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static be.wiselife.follow.entity.QFollow.follow;
import static be.wiselife.image.entity.QChallengeCertImage.challengeCertImage;
import static be.wiselife.image.entity.QChallengeExamImage.challengeExamImage;
import static be.wiselife.image.entity.QChallengeRepImage.challengeRepImage;
import static be.wiselife.image.entity.QMemberImage.memberImage;
import static be.wiselife.image.entity.QReviewImage.reviewImage;
import static be.wiselife.member.entity.QMember.member;
import static be.wiselife.memberchallenge.entity.QMemberChallenge.memberChallenge;
import static be.wiselife.order.entity.QOrder.order;
import static be.wiselife.challenge.entity.QChallenge.challenge;
import static java.lang.Thread.sleep;

@RequiredArgsConstructor
@Slf4j
public class QuerydslRepositoryImpl implements QuerydslRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager entityManager;

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

    //검증후 삭제 예정
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
                .orderBy(challengeCertImage.createdAt.desc())//인덱스에 대한 고민
                .fetch();
    }

    /**
     * 현재는 테스트를 위해서 최초 생성시간하고 정확히 같게 설정해둠
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
                        .and(challengeCertImage.createdAt.hour().eq(LocalDateTime.now().getHour())))
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
    //벌크연산?
    @Override
    public MemberChallenge countSave(Challenge beforeChallenge,Member beforeMember) {
        MemberChallenge memberChallenge = new MemberChallenge();
        memberChallenge.setExpectedRefundToMember(beforeChallenge.getChallengeFeePerPerson());
        memberChallenge.setMember(beforeMember);
        memberChallenge.setChallenge(beforeChallenge);

//        queryFactory.
//                update(memberChallenge).
//                set(memberChallenge.expectedRefundToMember, (double) beforeChallenge.getChallengeFeePerPerson())
//                .set(memberChallenge.member, beforeMember)
//                .set(memberChallenge.challenge, beforeChallenge).execute();


        queryFactory.
                update(challenge)
                .set(challenge.challengeTotalReward,
                        challenge.challengeTotalReward.add(beforeChallenge.getChallengeTotalReward()))
                .set(challenge.challengeCurrentParty, challenge.challengeCurrentParty.add(1))
                .where(challenge.challengeId.eq(beforeChallenge.getChallengeId()))
                .execute();

        queryFactory.update(member)
                .set(member.memberMoney, beforeMember.getMemberMoney() - beforeChallenge.getChallengeFeePerPerson())
                .where(member.memberId.eq(beforeMember.getMemberId()))
                .execute();


        return memberChallenge;
           }




}
