package be.wiselife.member.controller;

import be.wiselife.dto.MultiResponseDto;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.member.entity.Member;
import be.wiselife.member.mapper.MemberMapper;
import be.wiselife.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper mapper;

    //추가 의존성 주입 필요, voter, image, challenge, challengeReview 관련 Service 클래스

    /**
     * 회원등록
     * 카카오 보안 적용시 Authorization을 인자로 받아서 email과 image의 레포지토리에 저장예정이지만
     * 아직 없으므로 테스트 용도로 구현
     * 이 컨트롤러가 호출할 memberService를 보완 적용 후
     */
    @PostMapping
    public ResponseEntity postMember() {
        Member member = new Member();

        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToDetailResponse(createdMember)), HttpStatus.CREATED);
    }

    /**
     * 회원 단건조회(memberId)
     * 테스트 용도로 작동하는 것으로 memberId를 쿼리파라미터로 전달시 해당회원이 조회된다.
     */
    @GetMapping("/test/{memberId}")
    public ResponseEntity getMemberById(@PathVariable("memberId") Long memberId) {
        Member member = memberService.findMemberById(memberId);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(member)),HttpStatus.OK);
    }

    /**
     * 회원 단건조회(memberName)
     * 챌린지나, 회원 랭킹, 회원 리스트로 조회시 회원을 클릭하면 회원 상세페이지가 나타날수 있게 하는 메소드
     */
    @GetMapping("/{memberName}")
    public ResponseEntity getMemberByMemberName(@PathVariable("memberName") String memberName) {
        Member member = memberService.findMemberByMemberName(memberName);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(member)),HttpStatus.OK);
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
     * 회원 정보수정
     * 회원이 본인의 정보를 수정할때,
     * 차후 로그인 기능 구현시 본인만 회원정보를 수정할 수 있게 파라미터를 수정해야한다.
     */
    @PatchMapping("/{memberName}")
    public ResponseEntity patchMember(@PathVariable("memberName") String memberName) {
        Member member = memberService.updateMemberInfo(memberName);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(member)),HttpStatus.OK);
    }
}
