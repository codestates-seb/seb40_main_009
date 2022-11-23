package be.wiselife.dummy;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.follow.service.FollowService;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import be.wiselife.memberchallenge.service.MemberChallengeService;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DummyService {
    private final MemberRepository memberRepository;
    private final ChallengeRepository challengeRepository;

    private final MemberChallengeRepository memberChallengeRepository;

    private final ImageService imageService;

    private final ChallengeService challengeService;

    private final MemberChallengeService memberChallengeService;

    private final FollowService followService;

    private final MemberService memberService;

    private final JwtTokenizer jwtTokenizer;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initData(){
        createMockMember();
        createMockChallenge();
        participateMockMember();
    }
    /**
     * 테스트용 계정 생성
     *
     *
     */

    public void createMockMember() {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        Member test1 = new Member("test1@kakao.com", "이미지",roles, "kakao", "providerId",2, Member.MemberBadge.새내기,"test1");
        Member test2 = new Member("test2@kakao.com", "이미지",roles, "kakao", "providerId",11, Member.MemberBadge.새내기,"test2");
        Member test3 = new Member("test3@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.새내기,"test3");
        Member test4 = new Member("test4@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.좀치는도전자,"test4");
        Member test5 = new Member("test5@kakao.com", "이미지",roles, "kakao", "providerId",6, Member.MemberBadge.열정도전자,"test5");
        Member test6 = new Member("test6@kakao.com", "이미지",roles, "kakao", "providerId",7, Member.MemberBadge.모범도전자,"test6");
        Member test7 = new Member("test7@kakao.com", "이미지",roles, "kakao", "providerId",10, Member.MemberBadge.우수도전자,"test7");
        Member test8 = new Member("test8@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.챌린지장인,"test8");
        Member test9 = new Member("test9@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.시간의지배자,"test9");
        Member test10 = new Member("test10@kakao.com", "이미지",roles, "kakao", "providerId",2, Member.MemberBadge.새내기,"test10");
        Member test11 = new Member("test11@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.새내기,"test11");
        Member test12 = new Member("test12@kakao.com", "이미지",roles, "kakao", "providerId",11, Member.MemberBadge.새내기,"test12");
        Member test13 = new Member("test13@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.새내기,"test13");
        Member test14 = new Member("test14@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.좀치는도전자,"test14");
        Member test15 = new Member("test15@kakao.com", "이미지",roles, "kakao", "providerId",6, Member.MemberBadge.열정도전자,"test15");
        Member test16 = new Member("test16@kakao.com", "이미지",roles, "kakao", "providerId",7, Member.MemberBadge.모범도전자,"test16");
        Member test17 = new Member("test17@kakao.com", "이미지",roles, "kakao", "providerId",10, Member.MemberBadge.우수도전자,"test17");
        Member test18 = new Member("test18@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.챌린지장인,"test18");
        Member test19 = new Member("test19@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.시간의지배자,"test19");
        Member test20 = new Member("test20@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.챌린지신,"test20");
        memberRepository.save(test1);memberRepository.save(test2);memberRepository.save(test3);memberRepository.save(test4);
        memberRepository.save(test5);memberRepository.save(test6);memberRepository.save(test7);memberRepository.save(test8);
        memberRepository.save(test9);memberRepository.save(test10);memberRepository.save(test11);memberRepository.save(test12);
        memberRepository.save(test13);memberRepository.save(test14);memberRepository.save(test15);memberRepository.save(test16);
        memberRepository.save(test17);memberRepository.save(test18);memberRepository.save(test19);memberRepository.save(test20);
    }


    public void createMockChallenge() {
        Challenge challenge1 = new Challenge((long)1, Challenge.ChallengeCategory.SHARED_CHALLENGE,
                "타이틀1","타이틀1 챌린지입니다.",10,3,
                LocalDate.of(2022,11,1),
                LocalDate.of(2022,11,5),
                "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","");
        Challenge challenge2 = new Challenge((long)2, Challenge.ChallengeCategory.SHARED_CHALLENGE,
                "타이틀2","타이틀2 챌린지입니다.",10,3,
                LocalDate.of(2022,11,1),
                LocalDate.of(2023,11,21),
                "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","");
        Challenge challenge3 = new Challenge((long)3, Challenge.ChallengeCategory.SHARED_CHALLENGE,
                "타이틀2","타이틀2 챌린지입니다.",10,3,
                LocalDate.of(2022,11,1),
                LocalDate.of(2023,10,31),
                "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","");
        challengeRepository.save(challenge1);
        challengeRepository.save(challenge2);
        challengeRepository.save(challenge3);
    }

    public void participateMockMember() {
        Challenge challenge1 = challengeService.findChallengeById(1L);
        Challenge challenge2 = challengeService.findChallengeById(2L);
        Member member1 = memberService.findMemberByEmail("test1@kakao.com");
        Member member2 = memberService.findMemberByEmail("test2@kakao.com");
        Member member3 = memberService.findMemberByEmail("test3@kakao.com");

        MemberChallenge memberChallenge1 = new MemberChallenge(1L, challenge1.getChallengeFeePerPerson(),
                0, 0, member1, challenge1);
        memberChallenge1.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge1.getChallenge().getChallengeStartDate(),
                memberChallenge1.getChallenge().getChallengeEndDate()));
        MemberChallenge memberChallenge2 = new MemberChallenge(2L, challenge2.getChallengeFeePerPerson(),
                0, 0, member1, challenge2);
        memberChallenge2.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge2.getChallenge().getChallengeStartDate(),
                memberChallenge2.getChallenge().getChallengeEndDate()));
        member1.setMemberChallengeTryCount(member1.getMemberChallengeTryCount() + 2);
        memberRepository.save(member1);
        MemberChallenge memberChallenge3 = new MemberChallenge(3L, challenge1.getChallengeFeePerPerson(),
                0, 0, member2, challenge1);
        memberChallenge3.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge3.getChallenge().getChallengeStartDate(),
                memberChallenge3.getChallenge().getChallengeEndDate()));
        MemberChallenge memberChallenge4 = new MemberChallenge(4L, challenge2.getChallengeFeePerPerson(),
                0, 0, member2, challenge2);
        memberChallenge4.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge4.getChallenge().getChallengeStartDate(),
                memberChallenge4.getChallenge().getChallengeEndDate()));
        member2.setMemberChallengeTryCount(member2.getMemberChallengeTryCount() + 2);
        memberRepository.save(member2);
        MemberChallenge memberChallenge5 = new MemberChallenge(5L, challenge1.getChallengeFeePerPerson(),
                0, 0, member3, challenge1);
        memberChallenge5.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge5.getChallenge().getChallengeStartDate(),
                memberChallenge5.getChallenge().getChallengeEndDate()));
        MemberChallenge memberChallenge6 = new MemberChallenge(6L, challenge2.getChallengeFeePerPerson(),
                0, 0, member3, challenge2);
        memberChallenge6.setChallengeObjDay(ChronoUnit.DAYS.between(memberChallenge6.getChallenge().getChallengeStartDate(),
                memberChallenge6.getChallenge().getChallengeEndDate()));
        member3.setMemberChallengeTryCount(member3.getMemberChallengeTryCount() + 2);
        memberRepository.save(member3);

        memberChallengeRepository.save(memberChallenge1);
        memberChallengeRepository.save(memberChallenge2);
        memberChallengeRepository.save(memberChallenge3);
        memberChallengeRepository.save(memberChallenge4);
        memberChallengeRepository.save(memberChallenge5);
        memberChallengeRepository.save(memberChallenge6);
    }

}