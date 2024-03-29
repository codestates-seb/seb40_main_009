package be.wiselife.challengetalk.controller;

import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.challengetalk.mapper.ChallengeTalkMapper;
import be.wiselife.challengetalk.service.ChallengeTalkService;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/challenge-talks")
@Validated
public class ChallengeTalkController {
    private final ChallengeTalkService challengeTalkService;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final ChallengeTalkMapper challengeTalkMapper;

    public ChallengeTalkController(ChallengeTalkService challengeTalkService, MemberService memberService, JwtTokenizer jwtTokenizer, ChallengeTalkMapper challengeTalkMapper) {
        this.challengeTalkService = challengeTalkService;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
        this.challengeTalkMapper = challengeTalkMapper;
    }

    /**
     * 챌린지 댓글 생성
     */
    @PostMapping()
    public ResponseEntity postChallengeTalk(@Valid @RequestBody ChallengeTalkDto.Post challengeTalkPostDto,
                                            HttpServletRequest request) {

        ChallengeTalk challengeTalk = challengeTalkMapper.challengeTalkPostDtoToChallenge(challengeTalkPostDto);
        challengeTalk = challengeTalkService.createChallengeTalk(challengeTalk, challengeTalkPostDto.getChallengeId(),
                                                                memberService.getLoginMember(request));

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeTalkMapper.challengeTalkToChallengeTalkResponseDto(challengeTalk, challengeTalk.getCreate_by_member())),
                HttpStatus.CREATED);
    }

    /**
     * 챌린지 댓글 수정
     */
    @PatchMapping("/{challenge-talk-id}")
    public ResponseEntity patchChallengeTalk(@PathVariable("challenge-talk-id") @Positive Long challengeTalkId,
                                             @Valid @RequestBody ChallengeTalkDto.Patch challengeTalkPatchDto,
                                             HttpServletRequest request) {

        challengeTalkPatchDto.setChallengeTalkId(challengeTalkId);
        ChallengeTalk challengeTalk = challengeTalkMapper.challengeTalkPatchDtoToChallenge(challengeTalkPatchDto);

        challengeTalk = challengeTalkService.updateChallengeTalk(challengeTalk, memberService.getLoginMember(request));

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeTalkMapper.challengeTalkToChallengeTalkResponseDto(challengeTalk,
                        memberService.findMemberById(challengeTalk.getMemberId()).getMemberName())),
                HttpStatus.OK);
    }

    @GetMapping("/{challenge-talk-id}")
    public ResponseEntity getChallengeTalk(@PathVariable("challenge-talk-id") @Positive Long challengeTalkId) {

        ChallengeTalk challengeTalk = challengeTalkService.findChallengeTalkById(challengeTalkId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeTalkMapper.challengeTalkToChallengeTalkResponseDto(challengeTalk,
                        memberService.findMemberById(challengeTalk.getMemberId()).getMemberName())),
                HttpStatus.OK);
    }

    @DeleteMapping("/{challenge-talk-id}")
    public ResponseEntity DeleteChallengeTalk(@PathVariable("challenge-talk-id") @Positive Long challengeTalkId,
                                              HttpServletRequest request) {

        challengeTalkService.deleteChallengeTalk(challengeTalkId, memberService.getLoginMember(request));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
