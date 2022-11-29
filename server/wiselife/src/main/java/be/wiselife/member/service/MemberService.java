package be.wiselife.member.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
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

    private final JwtTokenizer jwtTokenizer;

    /**
     * 회원 단건조회(memberName)
     * 챌린지나, 회원 랭킹, 회원 리스트로 조회시 회원을 클릭하면 회원 상세페이지가 나타날수 있게 하는 메소드
     * 자신이 접근하게 되면 followStatus self, 타인이 접근하면 follow 유무에 따라 follow/unfollow로 나타난다.
     * 참여한 챌린지의 인증일자를 70% 초과하면 성공으로 간주 한다.
     */
    public Member findMember(Member follower,Member following) {
        Follow follow = memberRepository.findByFollowerIdAndFollowing(follower.getMemberId(), following);

        //팔로우인지 아닌지 판단하는 부분
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

    public Member updateMemberInfo(String memberName, Member member, Member loginMember, MultipartFile multipartFiles) throws IOException {
        Member memberFromRepository = findMemberByMemberName(memberName);

        if (!loginMember.getMemberName().equals(memberName)) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_UPDATE_MEMBER_INFORMATION_OTHER_PERSON);
        }
        verifyExistsMemberName(member.getMemberName());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(new_memberName->memberFromRepository.setMemberName(new_memberName));
        Optional.ofNullable(member.getMemberDescription())
                .ifPresent(new_memberDescription->memberFromRepository.setMemberDescription(new_memberDescription));

        if (!Optional.ofNullable(multipartFiles).isEmpty()) {
            log.info("multipartFiles={}",multipartFiles.getBytes());
            member.setMemberId(memberFromRepository.getMemberId());
            imageService.patchMemberImage(member,multipartFiles);
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

    /**
     * JWT 토큰의 유저 이메일 이용해 login된 멤버 객체 가져오는 함수
     * 시도하려는 유저에게 권한이 있는지 확인하기 위해 사용한다.
     */
    public Member getLoginMember(HttpServletRequest request) {
        String loginEmail = jwtTokenizer.getEmailWithToken(request);
        return findMemberByEmail(loginEmail);
    }

    public Member findMemberById(Long memberId){
        return verifiedMemberById(memberId);
    }

    public Member findByRefreshToken(String refreshToken) {
        Optional<Member> token = memberRepository.findByRefreshToken(refreshToken);
        return token.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_IS_NOT_VALIDED));
    }

    /**
     * 모든 맴버의 이름만을 반환한다.
     */
    public List<String> getAllMembersName() {
        List<Member> members = memberRepository.findAll();
        List<String> result = new ArrayList<>();

        for(Member name : members){
            result.add(name.getMemberName());
        }

        return result;
    }

    /**
     * 검색기능
     * @param name 검색된 데이터
     */
    public Page<Member> searchMember(String name, int page, int size) {

        return memberRepository.findAllByMemberNameContaining(name, PageRequest.of(page, size, Sort.by("createdAt")))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
