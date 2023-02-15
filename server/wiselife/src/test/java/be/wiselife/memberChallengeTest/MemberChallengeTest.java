package be.wiselife.memberChallengeTest;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.repository.ChallengeRepository;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.repository.ChallengeReviewRepository;
import be.wiselife.challengetalk.controller.ChallengeTalkController;
import be.wiselife.challengetalk.repository.ChallengeTalkRepository;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
import be.wiselife.memberchallenge.service.MemberChallengeService;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebMvcTest(MemberChallengeService.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
public class MemberChallengeTest {

    @MockBean
    private MemberChallengeRepository memberChallengeRepository;
    @MockBean
    private MemberRepository memberRepository;
    @MockBean
    private ChallengeRepository challengeRepository;
    @MockBean
    private ImageRepository imageRepository;
    @MockBean
    private ChallengeTalkRepository challengeTalkRepository;
    @MockBean
    private ChallengeReviewRepository challengeReviewRepository;
    @MockBean
    private ChallengeService challengeService;
    @MockBean
    private MemberService memberService;

    @InjectMocks
    private MemberChallengeService memberChallengeService;

    @Test
    @DisplayName("동시성 테스트")
    void participate() throws Exception{
        //given
//        Challenge challenge = new Challenge(1L, Challenge.ChallengeCategory.BUCKET_LIST, "test", "설명", 2, 1, LocalDate.now(), LocalDate.of(2023, 02, 07), "부가설명", 1,
//                10000, "none", "image", "image2", new ArrayList<String>(Arrays.asList("13:00")));
//        challenge.setChallengeCurrentParty(0);
//        Member A = new Member("test1@gmail.com", "이미지", new ArrayList<>(Arrays.asList("USER")), "kakao", "123123", "test_TOKEN1");
//        A.setMemberMoney(10000);
//        Member B = new Member("test2@gmail.com", "이미지2", new ArrayList<>(Arrays.asList("USER")), "kakao1", "123412", "test_TOKEN2");
//        B.setMemberMoney(10000);
//        challenge = memberChallengeService.plusMemberAndChallenge(challenge, A);
//        challenge = memberChallengeService.plusMemberAndChallenge(challenge, B);

    }

}
