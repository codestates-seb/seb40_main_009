package be.wiselife.member.repository;

import be.wiselife.member.entity.Member;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long>, QuerydslRepository {
    //memberName를 클릭했을때, 해당 회원에 상세페이지로 넘어가기위해 db에서 꺼내오는 메소드
    Optional<Member> findByMemberName(String memberName);

    //회원이 개인정보 수정시 Authorization에서 본인인지 확인 하기 위해 db에 같은 이메일로 등록된 회원을 조회하는 용도
    Optional<Member> findByMemberEmail(String memberEmail);

    Optional<Member> findByRefreshToken(String refreshToken);
    Optional<Page<Member>> findAllByMemberNameContaining(String memberName, Pageable pageable);
    @Query("select m from Member m left join m.follows")
    List<Member> findAllNormalJPQL();

    //지연 로딩시 findAll로 인한 N+1 문제 해결
    @EntityGraph(attributePaths = {"follows"}, type = EntityGraph.EntityGraphType.FETCH)
    @Query("select m from Member m left join m.follows")
    List<Member> findAllFetchJPQL();

    //지연 로딩시 findAll 페이지네이션으로 인한 N+1 문제 해결
    @EntityGraph(attributePaths = {"follows"}, type = EntityGraph.EntityGraphType.FETCH)
    @Query("select m from Member m left join m.follows")
    Page<Member> findAllPageFetch(Pageable pageable);

    //둘 이상의 컬렉션 fetch join 불가능 확인용 메소드
    @EntityGraph(attributePaths = {"follows","orders"}, type = EntityGraph.EntityGraphType.FETCH)
    @Query("select m from Member m left join m.follows")
    List<Member> findAllTwoFetchJPQL();
}
