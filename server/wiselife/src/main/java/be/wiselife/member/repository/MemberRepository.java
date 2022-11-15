package be.wiselife.member.repository;

import be.wiselife.member.entity.Member;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long>, QuerydslRepository {
    //memberName를 클릭했을때, 해당 회원에 상세페이지로 넘어가기위해 db에서 꺼내오는 메소드
    Optional<Member> findByMemberName(String memberName);

    //회원이 개인정보 수정시 Authorization에서 본인인지 확인 하기 위해 db에 같은 이메일로 등록된 회원을 조회하는 용도
    Optional<Member> findByMemberEmail(String memberEmail);

}
