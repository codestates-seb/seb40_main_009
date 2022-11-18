package be.wiselife.challengereview.controller;

import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.challengereview.service.ChallengeReviewService;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.security.JwtTokenizer;
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
    private final ChallengeReviewMapper challengeReviewMapper;
    private final JwtTokenizer jwtTokenizer;

    public ChallengeReviewController(ChallengeReviewService challengeReviewService, ChallengeReviewMapper challengeReviewMapper, JwtTokenizer jwtTokenizer) {
        this.challengeReviewService = challengeReviewService;
        this.challengeReviewMapper = challengeReviewMapper;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping()
    public ResponseEntity postChallengeReview(@Valid @RequestBody ChallengeReviewDto.Post challengeReviewPostDto) {

        ChallengeReview challengeReview = challengeReviewMapper.challengeReviewPostDtoToChallengeReview(challengeReviewPostDto);
        challengeReview = challengeReviewService.createChallengeReview(challengeReview, challengeReviewPostDto.getMemberId(), challengeReviewPostDto.getChallengeId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{challenge-review-id}")
    public ResponseEntity patchChallengeTalk(@PathVariable("challenge-review-id") @Positive Long challengeReviewId,
                                             @Valid @RequestBody ChallengeReviewDto.Patch challengeReviewPatchDto,
                                             HttpServletRequest request) {

        String tryingMemberEmail = jwtTokenizer.getEmailWithToken(request);
        challengeReviewPatchDto.setChallengeReviewId(challengeReviewId);

        ChallengeReview challengeReview = challengeReviewService.updateChallengeReview(challengeReviewMapper.challengeReviewPatchDtoToChallengeReview(challengeReviewPatchDto), tryingMemberEmail);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.OK);
    }
}
