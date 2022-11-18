package be.wiselife.challengereview.controller;

import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.challengereview.service.ChallengeReviewService;
import be.wiselife.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/challenge-reviews")
@Validated
public class ChallengeReviewController {
    private final ChallengeReviewService challengeReviewService;
    private final ChallengeReviewMapper challengeReviewMapper;

    public ChallengeReviewController(ChallengeReviewService challengeReviewService, ChallengeReviewMapper challengeReviewMapper) {
        this.challengeReviewService = challengeReviewService;
        this.challengeReviewMapper = challengeReviewMapper;
    }

    @PostMapping()
    public ResponseEntity postChallengeReview(@Valid @RequestBody ChallengeReviewDto.Post challengeReviewPostDto) {

        ChallengeReview challengeReview = challengeReviewMapper.challengeReviewPostDtoToChallengeReview(challengeReviewPostDto);
        challengeReview = challengeReviewService.createChallengeReview(challengeReview, challengeReviewPostDto.getMemberId(), challengeReviewPostDto.getChallengeId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.CREATED);
    }
}
