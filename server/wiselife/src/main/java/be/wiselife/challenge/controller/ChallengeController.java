package be.wiselife.challenge.controller;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.mapper.ChallengeMapper;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengetalk.mapper.ChallengeTalkMapper;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/challenges")
@Validated
public class ChallengeController {
    private final ChallengeMapper challengeMapper;
    private final ChallengeService challengeService;
    private final ChallengeTalkMapper challengeTalkMapper;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public ChallengeController(ChallengeMapper challengeMapper, ChallengeService challengeService, ChallengeTalkMapper challengeTalkMapper, MemberService memberService, JwtTokenizer jwtTokenizer) {
        this.challengeMapper = challengeMapper;
        this.challengeService = challengeService;
        this.challengeTalkMapper = challengeTalkMapper;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }

    /*챌린지 생성*/
    @PostMapping
    public ResponseEntity postChallenge(@Valid @RequestBody ChallengeDto.Post challengePostDto){

        Challenge challenge = challengeMapper.challengePostDtoToChallenge(challengePostDto);
        challenge =  challengeService.createChallenge(challenge);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge))
                , HttpStatus.CREATED);
    }

    /*챌린지 수정*/
    @PatchMapping
    public ResponseEntity patchChallenge(@Valid @RequestBody ChallengeDto.Patch challengePatchDto){

        // JWT토큰 이용한 권한 인증 추가해야

        Challenge challenge = challengeMapper.challengePatchDtoToChallenge(challengePatchDto);
        challenge = challengeService.updateChallenge(challenge);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge))
                , HttpStatus.OK);
    }

    /*챌린지 상세페이지 조회*/
    /*
     * MemberChallenge 엔티티 구현 후 추가 해야 하는 기능
     * 1) 만약 유저가 해당 챌린지 참여중이라면 별도로 유저의 해당 챌린지 성공률도 표시함
     * 2) 챌린지 참여중인 유저들의 평균 챌린지 성공률
     *
     * 추후 추가할 기능
     * 1) 동일한 사용자의 조회수 중복 증가 방지 기능
     * */
    @GetMapping("/{challenge-id}")
    public ResponseEntity getChallenge(@PathVariable("challenge-id") @Positive Long challengeId){

        //jwt 토큰으로 멤버 email 받아오는 기능 추가해야

        Challenge challenge = challengeService.getChallenge(challengeId); //챌린지 찾기
        challenge = challengeService.updateViewCount(challenge); //조회수 증가

        ChallengeDto.DetailResponse challengeResponseDto = challengeMapper.challengeToChallengeDetailResponseDto(challenge, challengeTalkMapper, memberService);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeResponseDto)
                , HttpStatus.OK);
    }

    /*챌린지 삭제*/
    @DeleteMapping({"/{challenge-id}"})
    public ResponseEntity deleteChallenge(@PathVariable("challenge-id") @Positive Long challengeId){

        // JWT토큰 이용한 권한 인증 추가해야
        // 시작 이후면 삭제 못하게 로직 추가

        challengeService.deleteChallenge(challengeId);

        return new ResponseEntity<>(
                "Challenge 삭제 완료",HttpStatus.OK);
    }
}
