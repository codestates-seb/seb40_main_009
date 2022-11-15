package be.wiselife.member.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    /**
     * 추가 예정 서비스 로직
     * 뱃지 업그레이드 로직
     * 챌린지 성공률(성공한 챌린지/참여했던 챌린지) 계산 로직
     * 경험치 변동 로직
     *
     */
    private final MemberRepository memberRepository;

    public Member createMember(Member member) {
        String random = UUID.randomUUID().toString().substring(0, 6);

        member.setMemberEmail(random+"@gmail.com");

        member.setMemberName("챌린저"+random);

        return memberRepository.save(member);
    }

    public Member findMemberById(Long memberId) {
        return verifiedMemberById(memberId);
    }
    public Member findMemberByMemberName(String memberName) {
        return verifiedMemberByMemberName(memberName);
    }

    /**
     *
     * @param page = 몇번째 페이지?
     * @param size = 한페이지에 몇개씩?
     * @param sort = 어떤 기준으로?  유저 생성순, 인기도 순, 랭크 순으로 조회
     * @return
     */
    public Page<Member> findAllMember(int page, int size,String sort) {

        switch (sort) {
            case "memberBadge":
                sort = "memberLevel";
                break;
            case "followers":
                sort = "followers";
                break;
            default:
                sort = "memberId";
                break;
        }
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by(sort).descending()));
    }

    public Member updateMemberInfo(Long memberId, Member member) {
        Member memberFromRepository = verifiedMemberById(memberId);
        verifyExistsMemberName(member.getMemberName());
        log.info("patch.name = {}",member.getMemberName());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(new_memberName->memberFromRepository.setMemberName(new_memberName));
        Optional.ofNullable(member.getMemberDescription())
                .ifPresent(new_memberDescription->memberFromRepository.setMemberDescription(new_memberDescription));
        Optional.ofNullable(member.getMemberImage())
                .ifPresent(new_memberImage->memberFromRepository.setMemberImage(new_memberImage));

        return memberRepository.save(memberFromRepository);
    }

    private void verifyExistsMemberName(String memberName) {
        Optional<Member> member = memberRepository.findByMemberName(memberName);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_ALREADY_EXISTS);
        }
    }

    private Member verifiedMemberByMemberName(String memberName) {
        Optional<Member> optionalMember = memberRepository.findByMemberName(memberName);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    private Member verifiedMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    //follower 기준 sort 동작 확인용 추후 삭제 예정
    public void addFollowers(Long memberId) {
        Member member = verifiedMemberById(memberId);
        member.setFollowers(member.getFollowers()+1);
        memberRepository.save(member);
    }

    //Badge 기준 sort 동작 확인용 추후 삭제 예정
    public void changeBadge(Long memberId) {
        Member member = verifiedMemberById(memberId);
        int memberLevel = member.getMemberBadge().getLevel()+1;
        member.setMemberLevel(memberLevel);
        member.setMemberBadge(Member.MemberBadge.badgeOfLevel(memberLevel));
        memberRepository.save(member);
    }
}