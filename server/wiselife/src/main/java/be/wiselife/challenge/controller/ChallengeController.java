package be.wiselife.challenge.controller;

import be.wiselife.aop.NeedEmail;
import be.wiselife.aop.NeedMember;
import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.mapper.ChallengeMapper;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.challengetalk.mapper.ChallengeTalkMapper;
import be.wiselife.dto.MultiResponseDto;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.image.service.ImageService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.service.MemberChallengeService;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Range;
import be.wiselife.memberchallenge.repository.MemberChallengeRepository;
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
@RequestMapping("/challenges")
@Validated
@Slf4j
public class ChallengeController {
    private final MemberService memberService;
    private final ChallengeService challengeService;
    private final ChallengeTalkMapper challengeTalkMapper;
    private final ChallengeMapper challengeMapper;
    private final ChallengeReviewMapper challengeReviewMapper;
    private final MemberChallengeRepository memberChallengeRepository;
    private final MemberChallengeService memberChallengeService;
    private final ImageService imageService;

    public ChallengeController(MemberService memberService, ChallengeService challengeService, ChallengeTalkMapper challengeTalkMapper, ChallengeMapper challengeMapper, ChallengeReviewMapper challengeReviewMapper, MemberChallengeRepository memberChallengeRepository, MemberChallengeService memberChallengeService, ImageService imageService) {
        this.memberService = memberService;
        this.challengeService = challengeService;
        this.challengeTalkMapper = challengeTalkMapper;
        this.challengeMapper = challengeMapper;
        this.challengeReviewMapper = challengeReviewMapper;
        this.memberChallengeRepository = memberChallengeRepository;
        this.memberChallengeService = memberChallengeService;
        this.imageService = imageService;
    }

    /**
     * 챌린지 생성
     *
     * @param challengePostDto 생성할 챌린지 관련 정보
     * @param member         챌린지 생성하려는 멤버의 token 값 받기 위해 필요
     * @param exampleImage     예시사진들
     * @return
     */
    @NeedMember
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity postChallenge(Member member,
                                        @Valid @RequestPart(value = "post") ChallengeDto.Post challengePostDto,
                                        @RequestPart(value = "example", required = false) List<MultipartFile> exampleImage,
                                        @RequestPart(value = "rep", required = false) MultipartFile repImage) throws IOException {

        Challenge challenge = challengeMapper.challengePostDtoToChallenge(challengePostDto);
        challenge = challengeService.createChallenge(challenge, member, repImage, exampleImage);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge, challengeReviewMapper,member))
                , HttpStatus.CREATED);
    }

    /**
     * 챌린지 수정
     *
     * @param challengeId       CHALLENGE 테이블 PK
     * @param challengePatchDto 수정할 챌린지 관련 정보
     * @param member           챌린지 수정하려는 멤버의 token 값 받기 위해 필요
     * @return
     */
    @NeedMember
    @PatchMapping(value = "/{challenge-id}", consumes = {"multipart/form-data"})
    public ResponseEntity patchChallenge(Member member,
                                         @PathVariable("challenge-id") @Positive Long challengeId,
                                         @Valid @RequestPart(value = "patch", required = false) ChallengeDto.Patch challengePatchDto,
                                         @RequestPart(value = "example", required = false) List<MultipartFile> exampleImage,
                                         @RequestPart(value = "rep", required = false) MultipartFile repImage) throws IOException {

        Challenge challenge = challengeMapper.challengePatchDtoToChallenge(challengePatchDto);
        challenge = challengeService.updateChallenge(challenge, member, challengeId, exampleImage, repImage);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge, challengeReviewMapper,member))
                , HttpStatus.OK);
    }


    /**
     * 참가에 사용될 url 프론트에서는 참가자가 챌린지에 접근하면 이 유알엘로 가는 버튼만 활성화 해야함
     *
     * @param challengeId CHALLENGE 테이블 PK
     * @param member login member
     * @return
     */
    @NeedMember
    @PostMapping("/participate/{challengeId}")
    public ResponseEntity postMemberAndChallenge(Member member,
                                                   @PathVariable("challengeId") @Positive Long challengeId) {

        Challenge challengeFromRepository = challengeService.findChallengeById(challengeId);

        Challenge challenge = challengeService.participateChallenge(challengeFromRepository, member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge,challengeReviewMapper,member)),HttpStatus.OK);
    }

    /**
     * 탈퇴에 사용될 url 프론트에서는 참가자가 챌린지에 접근하면 이 유알엘로 가는 버튼만 활성화 해야함
     *
     * @param challengeId CHALLENGE 테이블 PK
     * @param member login member
     * @return
     */
    @NeedMember
    @PostMapping("/unparticipate/{challengeId}")
    public ResponseEntity deleteMemberAndChallenge(Member member,
                                                 @PathVariable("challengeId") @Positive Long challengeId) {

        Challenge challengeFromRepository = challengeService.findChallengeById(challengeId);

        Challenge challenge = challengeService.minusParticipateChallenge(challengeFromRepository, member);


        return new ResponseEntity<>(
                    new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challenge,challengeReviewMapper,member)),HttpStatus.OK);
    }

    /**
     * 작성자 : 유현
     * 수정자 : 민섭
     * 인증사진 등록
     *
     * @param challengeId   기존 Dto 삭제후, id를 받아오는걸로 변경
     * @param multipartFile 인증할 사진 받아오기
     * @param member       로그인한 사람의 이메일 정보를 가져오기위한 인자값
     */
    @NeedMember
    @PatchMapping(value = "/cert/{challenge-id}", consumes = {"multipart/form-data"})
    public ResponseEntity patchMemberCertification(Member member,
                                                   @Valid @PathVariable("challenge-id") @Positive Long challengeId,
                                                   @RequestPart(value = "cert", required = false) MultipartFile multipartFile) throws IOException {

        Challenge challenge = challengeService.updateCertImage(challengeId, member, multipartFile);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeMapper.challengeToChallengeDetailResponseDto(challenge,
                        challengeTalkMapper, memberService, challengeReviewMapper, member, memberChallengeService))
                , HttpStatus.CREATED);
    }

    /**
     * 작성자 : 유현
     * 챌린지 상세페이지 조회
     * 로그인 된 유저가 아닐시 인증사진은 안나오게 simpleResponse로 응답을 준다.
     * 로그인 된 유저면 자신이 인증한 사진만 볼 수 있게 detailResponse를 응답해 준다.
     */
    @NeedMember
    @GetMapping("/{challenge-id}")
    public ResponseEntity getChallenge(Member member,
                                       @PathVariable("challenge-id") @Positive Long challengeId,
                                       HttpServletRequest request) {
        Challenge challenge = challengeService.findChallengeById(challengeId); // 찾아왔는데 왜 패스값이 없냐? DB상에는있는데...
        challenge = challengeService.updateViewCount(challenge);

        if (request.getHeader("Authorization") == null || memberChallengeService.findMemberChallengeByMemberAndChallenge(challenge, member) == null) {

            ChallengeDto.SimpleResponse challengeResponseDto
                    = challengeMapper.challengeToChallengeSimpleResponseDto(challenge, challengeReviewMapper,member);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(challengeResponseDto), HttpStatus.OK);
        } else {

            ChallengeDto.DetailResponse challengeResponseDto
                    = challengeMapper.challengeToChallengeDetailResponseDto(challenge, challengeTalkMapper, memberService, challengeReviewMapper, member, memberChallengeService);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(challengeResponseDto), HttpStatus.OK);
        }
    }

    /**
     * 챌린지 삭제
     * @param challengeId
     * @param member
     * @return
     */
    @NeedMember
    @DeleteMapping({"/{challenge-id}"})
    public ResponseEntity deleteChallenge(Member member,@PathVariable("challenge-id") @Positive Long challengeId) {

        challengeService.deleteChallenge(challengeId, member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 카테고리별 전체 챌린지 조회
     * @param categoryId 카테고리에 해당하는 카테고리 id
     * @param sortBy     paging 기준 1.newest(=최신순) 2.popularity(=인기순)
     * @param page       조회하고 싶은 페이지 숫자
     * @param size       한 페이지에 들어갈 챌린지 개수
     * @return 카테고리에 해당하는 챌린지들 list
     */
    @GetMapping("/all/{category-id}")
    public ResponseEntity getAllChallengesInCategory(@PathVariable("category-id") @Range(min = 0L, max = 3L) Long categoryId,
                                                     @RequestParam(value = "sort-by", defaultValue = "popularity") String sortBy,
                                                     @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                     @Positive @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Challenge> pageInfo = challengeService.getAllChallengesInCategory(categoryId, page - 1, size, sortBy);
        List<ChallengeDto.SimpleResponse> challengeResponseDtoList = challengeMapper.challengeListToSimpleResponseDtoList(pageInfo.getContent(), challengeReviewMapper);

        return new ResponseEntity<>(
                new MultiResponseDto<>(challengeResponseDtoList, pageInfo),
                HttpStatus.OK);
    }

    /**
     * 검색 자동완성용 전체 챌린지 제목 조회
     *
     * @return 챌린지 제목 List
     */
    @GetMapping("/titles")
    public ResponseEntity getAllChallengeTitles() {

        List<Challenge> challengeList = challengeService.getAllChallenges();
        List<ChallengeDto.ChallengeTitleResponse> challengeTitleResponseList = challengeMapper.challengeListToChallengeTitleResponseList(challengeList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(challengeTitleResponseList)
                , HttpStatus.OK);
    }

    /**
     * 챌린지 제목을 통한 검색
     *
     * @param searchTitle 검색어
     * @param sortBy      paging 기준 1.newest(=최신순) 2.popularity(=인기순)
     * @param page        조회하고 싶은 페이지 숫자
     * @param size        한 페이지에 들어갈 챌린지 개수
     * @return
     */
    @GetMapping(value = "/search")
    public ResponseEntity searchChallengesByChallengeTitle(@RequestParam("searchTitle") String searchTitle,
                                                           @RequestParam(value = "sort-by", defaultValue = "popularity") String sortBy,
                                                           @Positive @RequestParam(value = "page", defaultValue = "1") int page,
                                                           @Positive @RequestParam(value = "size", defaultValue = "10") int size) {

        Page<Challenge> pageInfo = challengeService.searchChallengesByChallengeTitle(searchTitle, page - 1, size, sortBy);
        List<ChallengeDto.SimpleResponse> challengeResponseDtoList = challengeMapper.challengeListToSimpleResponseDtoList(pageInfo.getContent(), challengeReviewMapper);

        return new ResponseEntity<>(
                new MultiResponseDto<>(challengeResponseDtoList, pageInfo), HttpStatus.OK);
    }


}
