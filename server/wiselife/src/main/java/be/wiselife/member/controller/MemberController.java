package be.wiselife.member.controller;

import be.wiselife.aop.NeedEmail;
import be.wiselife.aop.NeedMember;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    @NeedEmail
    @GetMapping("/{followingName}")
    public ResponseEntity getMember(String email,
                                    @PathVariable("followingName") String followingName) {

        Member following = memberService.findMember(
                memberService.findMemberByEmail(email),
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
                                     @RequestParam(defaultValue = "memberId") String sort) {
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
     * DTO와 함께받기위해선 RequestPart를 사용해야함.
     */
    @NeedMember
    @PatchMapping(value = "/{memberName}",consumes = {"multipart/form-data"})
    public ResponseEntity patchMember(Member member,@PathVariable("memberName") String memberName,
                                      @Valid @RequestPart("patch") MemberDto.Patch patchData,
                                      @RequestPart(value = "image",required = false) MultipartFile multipartFiles
                                      ) throws IOException {

        Member updateMember = memberService.updateMemberInfo(memberName, mapper.memberPatchToMember(patchData), member, multipartFiles);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.memberToDetailResponse(updateMember)), HttpStatus.OK);
    }

    /**
     * 맴버이름 검색 컨트롤러
     * @param name 검색하고자 하는 이름
     * @param page page 수
     * @param size page당 불러오고자 하는 사이즈
     * @return
     */
    @GetMapping("/search/member")
    public ResponseEntity getSearchMembers(@RequestParam("name")String name,
                                           @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                           @Positive @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Member> pageInfo = memberService.searchMember(name, page - 1, size);
        List<Member> memberList = pageInfo.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.memberListResponses(memberList), pageInfo), HttpStatus.OK);
    }
}
