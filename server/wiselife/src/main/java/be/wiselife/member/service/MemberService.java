package be.wiselife.member.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
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
    @Transactional(readOnly = false)
    public Member findMember(Member follower,Member following) {
        log.info("findMember tx start");
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
        log.info("findMember tx end");
        return memberRepository.save(following);
    }



    //follower 검색용
    public Member findMemberByEmail(String memberEmail) {
        log.info("findMemberByEmail tx start");
        log.info("findMemberByEmail tx end");
        return verifiedMemberByEmail(memberEmail);
    }
    //following 검색용
    public Member findMemberByMemberName(String memberName) {
        log.info("findMemberByMemberName tx start");
        log.info("findMemberByMemberName tx end");
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
        log.info("findAllMember tx start");

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
        log.info("findAllMember tx end");
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by(sort).descending()));
    }

    @Transactional(readOnly = false)
    public Member updateMemberInfo(String existingMemberName, Member patchMember, Member existingMember, MultipartFile multipartFiles) throws IOException {
        log.info("updateMemberInfo tx start");

        //유저의 수정 권한 check
        if (!existingMember.getMemberName().equals(existingMemberName)) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_UPDATE_MEMBER_INFORMATION_OTHER_PERSON);
        }

        //수정하려는 멤버이름 중복 check
        if(!patchMember.getMemberName().equals(existingMember.getMemberName())){
            verifyExistsMemberName(patchMember.getMemberName());
        }

        if(patchMember != null){
        Optional.ofNullable(patchMember.getMemberName())
                .ifPresent(new_memberName->existingMember.setMemberName(new_memberName));
        Optional.ofNullable(patchMember.getMemberDescription())
                .ifPresent(new_memberDescription->existingMember.setMemberDescription(new_memberDescription));
        }
        Optional.ofNullable(multipartFiles)
                .ifPresent(file -> {
                    try {
                        imageService.patchMemberImage(existingMember, file);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });

        log.info("updateMemberInfo tx end");
        return memberRepository.save(existingMember);
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
        return foundMember;
    }

    private Member verifiedMemberByEmail(String memberEmail) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberEmail);
        Member foundMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    /**
     * member ID 비교를 통해 권한이 있는 유저인지 확인
     *
     */
    public boolean isVerifiedMember(Long authorizedMemberId, Long tryingMemberId){
        log.info("isVerifiedMember tx start");
        log.info("isVerifiedMember tx end");
        return Objects.equals(authorizedMemberId, tryingMemberId);
    }

    /**
     * JWT 토큰의 유저 이메일 이용해 login된 멤버 객체 가져오는 함수
     * 시도하려는 유저에게 권한이 있는지 확인하기 위해 사용한다.
     */
    public Member getLoginMember(HttpServletRequest request) {
        log.info("getLoginMember tx start");
        String loginEmail = jwtTokenizer.getEmailWithToken(request);
        log.info("getLoginMember tx end");
        return findMemberByEmail(loginEmail);
    }

    public Member findMemberById(Long memberId) {
        log.info("findMemberById tx start");
        log.info("findMemberById tx end");

        return verifiedMemberById(memberId);
    }

    public Member findByRefreshToken(String refreshToken) {
        log.info("findByRefreshToken tx start");

        Optional<Member> token = memberRepository.findByRefreshToken(refreshToken);
        log.info("findByRefreshToken tx end");
        return token.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_IS_NOT_VALIDED));
    }

    /**
     * 모든 맴버의 이름만을 반환한다.
     */
    public List<String> getAllMembersName() {
        log.info("getAllMembersName tx start");
        List<Member> members = memberRepository.findAll();
        List<String> result = new ArrayList<>();

        for(Member name : members){
            result.add(name.getMemberName());
        }
        log.info("getAllMembersName tx end");

        return result;
    }

    /**
     * 검색기능
     * @param name 검색된 데이터
     */
    public Page<Member> searchMember(String name, int page, int size) {
        log.info("searchMember tx start");
        log.info("searchMember tx end");

        return memberRepository.findAllByMemberNameContaining(name, PageRequest.of(page, size, Sort.by("createdAt")))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    public List<Object[]> findAllOfThem() {
        return memberRepository.indexTester();

    }
}
