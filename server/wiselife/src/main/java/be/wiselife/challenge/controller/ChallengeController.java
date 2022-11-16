package be.wiselife.challenge.controller;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.mapper.ChallengeMapper;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.dto.SingleResponseDto;
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

    public ChallengeController(ChallengeMapper challengeMapper, ChallengeService challengeService) {
        this.challengeMapper = challengeMapper;
        this.challengeService = challengeService;
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

        Challenge challenge = challengeMapper.challengePatchDtoToChallenge(challengePatchDto);
        challenge = challengeService.updateChallenge(challenge);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge))
                , HttpStatus.OK);
    }

    /*챌린지 상세페이지 조회*/
    /* userId는 optional parameter
     *
     * 추후 userId 이용한 MemberChallenge 엔티티 구현 후 추가 해야 하는 기능
     * 1) 만약 유저가 해당 챌린지 참여중이라면 별도로 유저의 해당 챌린지 성공률도 표시함
     * 2) 챌린지 참여중인 유저들의 평균 챌린지 성공률
     * */
    @GetMapping("{challenge-id}")
    public ResponseEntity getChallenge(@PathVariable("challenge-id") @Positive Long challengeId,
                                       @RequestParam(value = "userId", required = false) Long userIdOrNull){

        Challenge challenge = challengeService.getChallenge(challengeId); //챌린지 찾기
        challenge = challengeService.updateViewCount(challenge); //조회수 증가

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeDetailResponseDto(challenge))
                , HttpStatus.OK);
    }


}
