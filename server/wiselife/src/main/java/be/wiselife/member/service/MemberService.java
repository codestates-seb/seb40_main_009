package be.wiselife.member.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

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

    private final ImageService imageService;

    /**
     * 테스트용 계정 생성
     *
     *
     */
    @PostConstruct
    public void createMockMember() {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        Member test1 = new Member("test1@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test2 = new Member("test2@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test3 = new Member("test3@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test4 = new Member("test4@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test5 = new Member("test5@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test6 = new Member("test6@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test7 = new Member("test7@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test8 = new Member("test8@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test9 = new Member("test9@kakao.com", "이미지",roles, "kakao", "providerId");
        Member test10 = new Member("test10@kakao.com", "이미지",roles, "kakao", "providerId");
        memberRepository.save(test1);memberRepository.save(test2);memberRepository.save(test3);memberRepository.save(test4);
        memberRepository.save(test5);memberRepository.save(test6);memberRepository.save(test7);memberRepository.save(test8);
        memberRepository.save(test9);memberRepository.save(test10);
    }


    /**
     * 회원 단건조회(memberName)
     * 챌린지나, 회원 랭킹, 회원 리스트로 조회시 회원을 클릭하면 회원 상세페이지가 나타날수 있게 하는 메소드
     * 자신이 접근하게 되면 followStatus self, 타인이 접근하면 follow 유무에 따라 follow/unfollow로 나타난다.
     */
    public Member findMember(Member follower,Member following) {
        Follow follow = memberRepository.findByFollowerIdAndFollowing(follower.getMemberId(), following);
        if (follow == null) {
            if (follower.getMemberId() == following.getMemberId()) {
                following.setFollowStatus(Member.FollowStatus.SELF);
                return memberRepository.save(following);
            }
            following.setFollowStatus(Member.FollowStatus.UNFOLLOW);
            return memberRepository.save(following);
        }
        if (follow.isFollow()) {
            following.setFollowStatus(Member.FollowStatus.FOLLOW);
        } else {
            following.setFollowStatus(Member.FollowStatus.UNFOLLOW);
        }
        return memberRepository.save(following);
    }

    //follower 검색용
    public Member findMemberByEmail(String memberEmail) {
        return verifiedMemberByEmail(memberEmail);
    }
    //following 검색용
    public Member findMemberByMemberName(String memberName) {
        return verifiedMemberByName(memberName);
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
            case "followerCount":
                sort = "followerCount";
                break;
            default:
                sort = "memberId";
                break;
        }
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by(sort).descending()));
    }

    public Member updateMemberInfo(String memberName, Member member,Member loginMember) {
        Member memberFromRepository = findMemberByMemberName(memberName);

        if (!loginMember.getMemberName().equals(memberName)) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_UPDATE_MEMBER_INFORMATION_OTHER_PERSON);
        }
        verifyExistsMemberName(member.getMemberName());
        log.info("patch.name = {}",member.getMemberName());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(new_memberName->memberFromRepository.setMemberName(new_memberName));
        Optional.ofNullable(member.getMemberDescription())
                .ifPresent(new_memberDescription->memberFromRepository.setMemberDescription(new_memberDescription));
        if (!Optional.ofNullable(member.getMemberImagePath()).isEmpty()) {
            member.setMemberId(memberFromRepository.getMemberId());
            imageService.patchMemberImage(member);
            memberFromRepository.setMemberImagePath(member.getMemberImagePath());
        }

        return memberRepository.save(memberFromRepository);
    }

    // 회원정보 수정시 닉네임이 같은것이 있는지 파악용
    private void verifyExistsMemberName(String memberName) {
        Optional<Member> member = memberRepository.findByMemberName(memberName);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NAME_ALREADY_EXISTS);
        }
    }

    private Member verifiedMemberByName(String memberName) {
        Optional<Member> optionalMember = memberRepository.findByMemberName(memberName);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    private Member verifiedMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        log.info("follower size={}",foundMember.getFollows().size());
        return foundMember;
    }

    private Member verifiedMemberByEmail(String memberEmail) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberEmail);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    //Badge 기준 sort 동작 확인용 추후 삭제 예정
    public void changeBadge(Long memberId) {
        Member member = verifiedMemberById(memberId);
        int memberLevel = member.getMemberBadge().getLevel()+1;
        member.setMemberLevel(memberLevel);
        member.setMemberBadge(Member.MemberBadge.badgeOfLevel(memberLevel));
        memberRepository.save(member);
    }

    /**
     * email 비교를 통해 권한이 있는 유저인지 확인
     * */
    public boolean isVerifiedMember(String authorizedMemberEmail, String tryingMemberEmail){
        return Objects.equals(authorizedMemberEmail, tryingMemberEmail);
    }

    /**
     * member ID 비교를 통해 권한이 있는 유저인지 확인
     * */
    public boolean isVerifiedMember(Long authorizedMemberId, Long tryingMemberId){
        return Objects.equals(authorizedMemberId, tryingMemberId);
    }


    public Member findMemberById(Long memberId){
        return verifiedMemberById(memberId);
    }
}
