package be.wiselife.member.controller;

import be.wiselife.dto.MultiResponseDto;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import be.wiselife.member.mapper.MemberMapper;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
@Validated
public class MemberController {
    /**
     * 추가 예정 매핑메소드
     * 도전중인 챌린지 조회
     * 전체 도전내역 조회
     * 결제내역 조회
     */

    //추가 의존성 주입 필요, voter, image, challenge, challengeReview 관련 Service 클래스
    private final MemberService memberService;

    private final MemberMapper mapper;

    private final JwtTokenizer jwtTokenizer;


    /**
     * 회원 단건조회(memberName)
     * 챌린지나, 회원 랭킹, 회원 리스트로 조회시 회원을 클릭하면 회원 상세페이지가 나타날수 있게 하는 메소드
     */
    @GetMapping("/{followingName}")
    public ResponseEntity getMember(@PathVariable("followingName") String followingName,
                                                HttpServletRequest request) {
        String followerEmail = jwtTokenizer.getEmailWithToken(request);

        Member following = memberService.findMember(
                memberService.findMemberByEmail(followerEmail),
                memberService.findMemberByMemberName(followingName));

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(following)),HttpStatus.OK);
    }
    /**
     * 회원 전체조회
     * 회원 랭킹, 회원 리스트로 조회시 회원리스트 출력
     */
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam(defaultValue = "questionId") String sort) {
        Page<Member> pageInformation = memberService.findAllMember(page - 1, size,sort);
        List<Member> allMembers = pageInformation.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.memberListResponses(allMembers),pageInformation),HttpStatus.OK);
    }

    /**
     * 해더에 보내질 모든 맴버의 이름
     * @return
     */
    @GetMapping("/names")
    public ResponseEntity getMembersName() {
        List<String> membersName = memberService.getAllMembersName();

        return new ResponseEntity(
                new SingleResponseDto<>(membersName), HttpStatus.OK);
    }

    /**
     * 회원 정보수정
     * 회원이 본인의 정보를 수정할때,
     */
    @PatchMapping("/{memberName}")
    public ResponseEntity patchMember(@PathVariable("memberName") String memberName,
                                      @Validated @RequestBody MemberDto.Patch patchData,
                                      HttpServletRequest request) {

        String followerEmail = jwtTokenizer.getEmailWithToken(request);
        Member loginMember = memberService.findMemberByEmail(followerEmail);

        Member updateMember = memberService.updateMemberInfo(memberName,mapper.memberPatchToMember(patchData),loginMember);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(updateMember)),HttpStatus.OK);
    }


    //Badge 기준 sort 동작 확인용 추후 삭제 예정
    @GetMapping("/testbadge/{memberId}")
    public void patchBadge(@PathVariable("memberId") Long memberId) {
        memberService.changeBadge(memberId);
    }

    @GetMapping("/search/member")
    public ResponseEntity getSearchMembers(@RequestParam("name")String name,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Member> pageInfo = memberService.searchMember(name, page - 1, size);
        List<Member> memberList = pageInfo.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.memberListResponses(memberList), pageInfo), HttpStatus.OK);
    }
}
