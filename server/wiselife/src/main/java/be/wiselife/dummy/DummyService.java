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

import java.time.LocalDate;
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
        Member test1 = new Member("test1@kakao.com", "이미지",roles, "kakao", "providerId",2, Member.MemberBadge.새내기,1,"test1",0);
        Member test2 = new Member("test2@kakao.com", "이미지",roles, "kakao", "providerId",11, Member.MemberBadge.새내기,1,"test2",0);
        Member test3 = new Member("test3@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.새내기,1,"test3",0);
        Member test4 = new Member("test4@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.좀치는도전자,2,"test4",1);
        Member test5 = new Member("test5@kakao.com", "이미지",roles, "kakao", "providerId",6, Member.MemberBadge.열정도전자,3,"test5",4);
        Member test6 = new Member("test6@kakao.com", "이미지",roles, "kakao", "providerId",7, Member.MemberBadge.모범도전자,4,"test6",7);
        Member test7 = new Member("test7@kakao.com", "이미지",roles, "kakao", "providerId",10, Member.MemberBadge.우수도전자,5,"test7",15);
        Member test8 = new Member("test8@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.챌린지장인,6,"test8",63);
        Member test9 = new Member("test9@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.시간의지배자,7,"test9",12);
        Member test10 = new Member("test10@kakao.com", "이미지",roles, "kakao", "providerId",2, Member.MemberBadge.새내기,1,"test10",0);
        Member test11 = new Member("test11@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.새내기,1,"test11",0);
        Member test12 = new Member("test12@kakao.com", "이미지",roles, "kakao", "providerId",11, Member.MemberBadge.새내기,1,"test12",0);
        Member test13 = new Member("test13@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.새내기,1,"test13",0);
        Member test14 = new Member("test14@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.좀치는도전자,2,"test14",1);
        Member test15 = new Member("test15@kakao.com", "이미지",roles, "kakao", "providerId",6, Member.MemberBadge.열정도전자,3,"test15",2);
        Member test16 = new Member("test16@kakao.com", "이미지",roles, "kakao", "providerId",7, Member.MemberBadge.모범도전자,4,"test16",4);
        Member test17 = new Member("test17@kakao.com", "이미지",roles, "kakao", "providerId",10, Member.MemberBadge.우수도전자,5,"test17",8);
        Member test18 = new Member("test18@kakao.com", "이미지",roles, "kakao", "providerId",1, Member.MemberBadge.챌린지장인,6,"test18",16);
        Member test19 = new Member("test19@kakao.com", "이미지",roles, "kakao", "providerId",4, Member.MemberBadge.시간의지배자,7,"test19",32);
        Member test20 = new Member("test20@kakao.com", "이미지",roles, "kakao", "providerId",3, Member.MemberBadge.챌린지신,8,"test20",64);
        memberRepository.save(test1);memberRepository.save(test2);memberRepository.save(test3);memberRepository.save(test4);
        memberRepository.save(test5);memberRepository.save(test6);memberRepository.save(test7);memberRepository.save(test8);
        memberRepository.save(test9);memberRepository.save(test10);memberRepository.save(test11);memberRepository.save(test12);
        memberRepository.save(test13);memberRepository.save(test14);memberRepository.save(test15);memberRepository.save(test16);
        memberRepository.save(test17);memberRepository.save(test18);memberRepository.save(test19);memberRepository.save(test20);
    }


    public void createMockChallenge() {
        Challenge challenge1 = new Challenge(1L, Challenge.ChallengeCategory.SHARED_CHALLENGE, "타이틀1","타이틀1 챌린지입니다.",10,3,
                LocalDate.of(2022,11,22), LocalDate.of(2023,11,21), "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","",3);
        Challenge challenge2 = new Challenge(2L, Challenge.ChallengeCategory.SHARED_CHALLENGE, "타이틀2","타이틀2 챌린지입니다.",10,3,
                LocalDate.of(2022,11,21), LocalDate.of(2023,11,21), "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","",3);
        Challenge challenge3 = new Challenge(3L, Challenge.ChallengeCategory.OFFLINE_CHALLENGE, "타이틀2","타이틀2 챌린지입니다.",10,3,
                LocalDate.of(2022,11,20), LocalDate.of(2023,11,21), "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","",3);
        Challenge challenge4 = new Challenge(4L, Challenge.ChallengeCategory.OFFLINE_CHALLENGE, "타이틀2","타이틀2 챌린지입니다.",10,3,
                LocalDate.of(2022,11,19), LocalDate.of(2023,11,21), "인증은 하루 3번",
                3,10000,"대표사진","인증예시1,인증예시2,인증예시3","",3);

               
        challenge1.setAuthorizedMemberId(1L);
        challenge2.setAuthorizedMemberId(1L);

        challengeRepository.save(challenge1);
        challengeRepository.save(challenge2);
        challengeRepository.save(challenge3);
        challengeRepository.save(challenge4);

    }

    public void participateMockMember() {
        Challenge challenge1 = challengeService.findChallengeById(1L);
        Challenge challenge2 = challengeService.findChallengeById(2L);
        Challenge challenge3 = challengeService.findChallengeById(3L);
        Challenge challenge4 = challengeService.findChallengeById(4L);
        Member member1 = memberService.findMemberByEmail("test1@kakao.com");
        Member member2 = memberService.findMemberByEmail("test2@kakao.com");
        Member member3 = memberService.findMemberByEmail("test3@kakao.com");

        MemberChallenge memberChallenge1 = new MemberChallenge(1L, challenge1.getChallengeFeePerPerson(),
                0, 0, member1, challenge1);
        MemberChallenge memberChallenge2 = new MemberChallenge(2L, challenge2.getChallengeFeePerPerson(),
                0, 0, member1, challenge2);
        MemberChallenge memberChallenge3 = new MemberChallenge(3L, challenge3.getChallengeFeePerPerson(),
                0, 0, member1, challenge3);
        MemberChallenge memberChallenge4 = new MemberChallenge(4L, challenge4.getChallengeFeePerPerson(),
                0, 0, member1, challenge4);

        memberRepository.save(member1);


        MemberChallenge memberChallenge5 = new MemberChallenge(5L, challenge1.getChallengeFeePerPerson(),
                0, 0, member2, challenge1);
        MemberChallenge memberChallenge6 = new MemberChallenge(6L, challenge2.getChallengeFeePerPerson(),
                0, 0, member2, challenge2);
        MemberChallenge memberChallenge7 = new MemberChallenge(7L, challenge3.getChallengeFeePerPerson(),
                0, 0, member2, challenge3);
        MemberChallenge memberChallenge8 = new MemberChallenge(8L, challenge4.getChallengeFeePerPerson(),
                0, 0, member2, challenge4);

        memberRepository.save(member2);


        MemberChallenge memberChallenge9 = new MemberChallenge(9L, challenge1.getChallengeFeePerPerson(),
                0, 0, member3, challenge1);
        MemberChallenge memberChallenge10 = new MemberChallenge(10L, challenge2.getChallengeFeePerPerson(),
                0, 0, member3, challenge2);
        MemberChallenge memberChallenge11 = new MemberChallenge(11L, challenge3.getChallengeFeePerPerson(),
                0, 0, member3, challenge3);
        MemberChallenge memberChallenge12 = new MemberChallenge(12L, challenge4.getChallengeFeePerPerson(),
                0, 0, member3, challenge4);
        memberRepository.save(member3);



        memberChallengeRepository.save(memberChallenge1);
        memberChallengeRepository.save(memberChallenge2);
        memberChallengeRepository.save(memberChallenge3);
        memberChallengeRepository.save(memberChallenge4);
        memberChallengeRepository.save(memberChallenge5);
        memberChallengeRepository.save(memberChallenge6);
        memberChallengeRepository.save(memberChallenge7);
        memberChallengeRepository.save(memberChallenge8);
        memberChallengeRepository.save(memberChallenge9);
        memberChallengeRepository.save(memberChallenge10);
        memberChallengeRepository.save(memberChallenge11);
        memberChallengeRepository.save(memberChallenge12);
    }
}

