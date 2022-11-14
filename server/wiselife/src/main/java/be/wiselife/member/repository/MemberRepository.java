package be.wiselife.member.repository;

import be.wiselife.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
    //memberEmail이나, memberName, member검색기능이 필요할꺼 같은데 우선 회의후 구현
}
