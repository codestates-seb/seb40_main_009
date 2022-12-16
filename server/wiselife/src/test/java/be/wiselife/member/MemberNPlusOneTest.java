package be.wiselife.member;

import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.hibernate.loader.MultipleBagFetchException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@Slf4j
@SpringBootTest
public class MemberNPlusOneTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

    @Test
    @DisplayName("Eager type는 Member를 단일 조회할 때 join문이 날아간다. N+1문제 x")
    void memberSingleFindTest() {
        log.info("===== Member SingleFindTest start =====");
        Member member = memberRepository.findById(1L).orElseThrow(()->new RuntimeException());
        log.info("===== Member SingleFindTest end =====");
        assertThat(member.getMemberName()).isEqualTo("test1");
    }

    @Test
    @DisplayName("Eager type는 Member를 전체 검색할때 N+1 문제o, 1+300 쿼리 발생")
    void MemberAllFindTest() {
        log.info("======= MemberFindAllTest start=======");
        List<Member> members = memberRepository.findAll();
        log.info("======= MemberFindAllTest end=======");
    }
    @Test
    @Transactional
    @DisplayName("Lazy type는 Member 검색 후 필드 검색을 할때 N+1문제가 발생한다. 1+300 쿼리 발생")
    void MemberFindAndFollowTest() {
        log.info("======= MemberFindAndFollowTest start=======");
        List<Member> members = memberRepository.findAll();
        log.info("======= MemberFindAndFollowTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }

    @Test
    @Transactional
    @DisplayName("일반 jpql 쿼리문은 N+1문제가 발생한다. 1+300 쿼리 발생")
    void MemberFindAndFollowNormalJPQLTest() {
        log.info("======= MemberFindAndFollowNormalJPQLTest start=======");
        List<Member> members = memberRepository.findAllNormalJPQL();
        log.info("======= MemberFindAndFollowNormalJPQLTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }

    @Test
    @Transactional
    @DisplayName("패치 jpql 쿼리문은 N+1문제가 발생한다. 1번만 쿼리 발생")
    void MemberFindAndFollowFetchJPQLTest() {
        log.info("======= MemberFindAndFollowNormalJPQLTest start=======");
        List<Member> members = memberRepository.findAllFetchJPQL();
        log.info("======= MemberFindAndFollowNormalJPQLTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }

    @Test
    @Transactional
    @DisplayName("멤버를 모두 조회 후 페이지네이션 할때 N+1 발생")
    void MemberFindAllPageTest() {
        log.info("======= MemberFindAllPageTest start=======");
        Page<Member> members = memberService.findAllMember(1,20,"memberId");
        log.info("======= MemberFindAndFollowNormalJPQLTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }

    @Test
    @Transactional
    @DisplayName("멤버를 모두 조회 후 페이지네이션 할때 N+1 해결 되나 Out of Memory(일단 모든 내용을 가져와서 메모리에 대비했다가 필요시 출력)문제 발생")
    void MemberFindAllPageFetchJoinTest() {
        log.info("======= MemberFindAllPageTest start=======");
        Page<Member> members = memberRepository.findAllPageFetch(PageRequest.of(1,10));
        log.info("======= MemberFindAndFollowNormalJPQLTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }

    @Test
    @Transactional
    @DisplayName("패치조인의 대상으로 컬랙션이 2개 이상일때 MultipleBagFetchException 발생")
    void MemberFindAndFollowTwoFetchJPQLTest() {
        log.info("======= MemberFindAndFollowTwoFetchJPQLTest start=======");
        List<Member> members = memberRepository.findAllTwoFetchJPQL();
        log.info("======= MemberFindAndFollowTwoFetchJPQLTest end=======");
        for (Member member : members) {
            log.info("follow size = {}",member.getFollows().size());
        }
    }
}
