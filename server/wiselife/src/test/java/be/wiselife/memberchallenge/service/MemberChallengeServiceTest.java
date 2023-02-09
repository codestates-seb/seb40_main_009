package be.wiselife.memberchallenge.service;


import be.wiselife.TestConfig;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Import;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestConfig.class)
class MemberChallengeServiceTest {

    @Autowired
    private MemberChallengeRepository memberChallengeRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private MemberRepository memberRepository;



    @Test
    void AutoConfigTest() throws InterruptedException {

        MemberChallengeService memberChallengeService = new MemberChallengeService(memberChallengeRepository,
                memberRepository, challengeRepository);
        List<String> time = new ArrayList<>();
        time.add("10:00");
        LocalDate startDate = LocalDate.of(2023, 2, 3);
        LocalDate endDate = LocalDate.of(2023, 2, 9);
        Challenge challenge = new Challenge(1L, Challenge.ChallengeCategory.BUCKET_LIST,"test1","test1",3,1,
                startDate,endDate,
                "인증",3,1000,"이미지","이미지","이미지",
                time);
        challengeRepository.save(challenge);
        List<String> role = new ArrayList<>();
        role.add("USER");
        Member member1 = new Member("dbgys1","image",role,"provider","dbgys1","dd");
        Member member2 = new Member("dbgys2","image",role,"provider","dbgys2","dd");
        member1.setMemberMoney(20000);
        member2.setMemberMoney(20000);

        memberChallengeService.plusMemberAndChallenge(challenge, member1);
        memberChallengeService.plusMemberAndChallenge(challenge, member2);
        Assertions.assertThat(challenge.getChallengeCurrentParty()).isEqualTo(1);
    }
}