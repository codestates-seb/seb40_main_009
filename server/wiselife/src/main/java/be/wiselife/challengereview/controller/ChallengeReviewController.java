package be.wiselife.challengereview.controller;

import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.challengereview.service.ChallengeReviewService;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/challenge-reviews")
@Validated
public class ChallengeReviewController {
    private final ChallengeReviewService challengeReviewService;
    private final MemberService memberService;
    private final ChallengeService challengeService;
    private final ChallengeReviewMapper challengeReviewMapper;

    public ChallengeReviewController(ChallengeReviewService challengeReviewService, MemberService memberService, ChallengeService challengeService, ChallengeReviewMapper challengeReviewMapper) {
        this.challengeReviewService = challengeReviewService;
        this.memberService = memberService;
        this.challengeService = challengeService;
        this.challengeReviewMapper = challengeReviewMapper;
    }

    @PostMapping
    public ResponseEntity postChallengeReview(@Valid @RequestBody ChallengeReviewDto.Post challengeReviewPostDto,
                                              HttpServletRequest request) {

        ChallengeReview challengeReview = challengeReviewMapper.challengeReviewPostDtoToChallengeReview(challengeReviewPostDto);
        challengeReview = challengeReviewService.createChallengeReview(challengeReview, memberService.getLoginMember(request), challengeService.getChallenge(challengeReviewPostDto.getChallengeId()) );

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{challenge-review-id}")
    public ResponseEntity patchChallengeReview(@PathVariable("challenge-review-id") @Positive Long challengeReviewId,
                                               @Valid @RequestBody ChallengeReviewDto.Patch challengeReviewPatchDto,
                                               HttpServletRequest request) {

        challengeReviewPatchDto.setChallengeReviewId(challengeReviewId);
        ChallengeReview changedChallengeReview = challengeReviewMapper.challengeReviewPatchDtoToChallengeReview(challengeReviewPatchDto);

        ChallengeReview challengeReview = challengeReviewService.updateChallengeReview(changedChallengeReview, memberService.getLoginMember(request));

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{challenge-review-id}")
    public ResponseEntity deleteChallengeReview(@PathVariable("challenge-review-id") @Positive Long challengeReviewId,
                                          HttpServletRequest request) {

        challengeService.deleteChallenge(challengeReviewId, memberService.getLoginMember(request));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
