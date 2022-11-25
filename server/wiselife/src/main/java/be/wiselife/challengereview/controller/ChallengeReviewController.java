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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;

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

    /**
     * 리뷰 생성
     * @param challengeReviewPostDto
     * @param request
     * @return
     */
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity postChallengeReview(@Valid @RequestPart(value = "post") ChallengeReviewDto.Post challengeReviewPostDto,
                                              @RequestPart(value = "review") MultipartFile multipartFile,
                                              HttpServletRequest request) throws IOException {

        ChallengeReview challengeReview = challengeReviewMapper.challengeReviewPostDtoToChallengeReview(challengeReviewPostDto);
        challengeReview = challengeReviewService.createChallengeReview(challengeReview, memberService.getLoginMember(request),
                            challengeService.getChallengeById(challengeReviewPostDto.getChallengeId()),multipartFile );

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.CREATED);

    }

    /**
     * 리뷰 수정
     * @param challengeReviewId
     * @param challengeReviewPatchDto
     * @param request
     * @return
     */
    @PatchMapping(value = "/{challenge-review-id}",consumes = {"multipart/form-data"})
    public ResponseEntity patchChallengeReview(@PathVariable("challenge-review-id") @Positive Long challengeReviewId,
                                               @Valid @RequestPart(value = "patch") ChallengeReviewDto.Patch challengeReviewPatchDto,
                                               @RequestPart(value = "review", required = false) MultipartFile multipartFile,
                                               HttpServletRequest request) {

        challengeReviewPatchDto.setChallengeReviewId(challengeReviewId);
        ChallengeReview changedChallengeReview = challengeReviewMapper.challengeReviewPatchDtoToChallengeReview(challengeReviewPatchDto);

        ChallengeReview challengeReview = challengeReviewService.updateChallengeReview(changedChallengeReview, memberService.getLoginMember(request), multipartFile);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview)),
                HttpStatus.OK);
    }

    /**
     * 리뷰 삭제
     * @param challengeReviewId
     * @param request
     * @return
     */
    @DeleteMapping("/{challenge-review-id}")
    public ResponseEntity deleteChallengeReview(@PathVariable("challenge-review-id") @Positive Long challengeReviewId,
                                          HttpServletRequest request) {

        challengeReviewService.deleteChallengeReview(challengeReviewId, memberService.getLoginMember(request));

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
