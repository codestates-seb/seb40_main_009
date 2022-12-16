package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.challengetalk.mapper.ChallengeTalkMapper;
import be.wiselife.image.entity.ChallengeCertImage;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import be.wiselife.memberchallenge.service.MemberChallengeService;
import org.mapstruct.Mapper;

import be.wiselife.challenge.entity.Challenge;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeMapper {

    List<ChallengeDto.ChallengeTitleResponse> challengeListToChallengeTitleResponseList(List<Challenge> challengeList);
    /**
     * 챌린지 생성 mapping
     */
    default Challenge challengePostDtoToChallenge(ChallengeDto.Post challengePostDto) {
        if ( challengePostDto == null ) {
            return null;
        }

        Challenge.ChallengeBuilder challenge = Challenge.builder();

        challenge.challengeTitle( challengePostDto.getChallengeTitle() );
        challenge.challengeDescription( challengePostDto.getChallengeDescription() );
        challenge.challengeMaxParty( challengePostDto.getChallengeMaxParty() );
        challenge.challengeMinParty( challengePostDto.getChallengeMinParty() );
        if ( challengePostDto.getChallengeStartDate() != null ) {
            challenge.challengeStartDate( LocalDate.parse( challengePostDto.getChallengeStartDate() ) );
        }
        if ( challengePostDto.getChallengeEndDate() != null ) {
            challenge.challengeEndDate( LocalDate.parse( challengePostDto.getChallengeEndDate() ) );
        }
        challenge.challengeAuthDescription( challengePostDto.getChallengeAuthDescription() );
        challenge.challengeAuthCycle( challengePostDto.getChallengeAuthCycle() );

        /*챌린지 인증 시간 추가*/
        List<String> list = challengePostDto.getChallengeAuthAvailableTime();
        if ( list != null ) {
            challenge.challengeAuthAvailableTime( new ArrayList<String>( list ) );
        }

        challenge.challengeFeePerPerson( challengePostDto.getChallengeFeePerPerson() );

        /*챌린지 카테고리를 숫자로 받아 enum으로 변환하여 entity에 저장*/
        switch (challengePostDto.getChallengeCategoryId()){
            case 1:
                challenge.challengeCategory(Challenge.ChallengeCategory.BUCKET_LIST);
                break;
            case 2:
                challenge.challengeCategory(Challenge.ChallengeCategory.SHARED_CHALLENGE);
                break;
            case 3:
                challenge.challengeCategory(Challenge.ChallengeCategory.OFFLINE_CHALLENGE);
                break;
        }
//        challenge.challengeExamImagePath(challengePostDto.getChallengeExamImagePath());
//        challenge.challengeRepImagePath(challengePostDto.getChallengeRepImagePath());

        return challenge.build();
    }

    /**
     *  챌린지patchDto => 챌린지 엔티티
     */
    default Challenge challengePatchDtoToChallenge(ChallengeDto.Patch challengePatchDto) {
        if ( challengePatchDto == null ) {
            return null;
        }

        Challenge.ChallengeBuilder challenge = Challenge.builder();
        if(challengePatchDto.getChallengeTitle() != null)
            challenge.challengeTitle( challengePatchDto.getChallengeTitle() );
        if(challengePatchDto.getChallengeDescription() != null)
            challenge.challengeDescription( challengePatchDto.getChallengeDescription() );
        if(challengePatchDto.getChallengeMaxParty() != 0)
            challenge.challengeMaxParty( challengePatchDto.getChallengeMaxParty() );
        if(challengePatchDto.getChallengeMinParty() != 0)
            challenge.challengeMinParty( challengePatchDto.getChallengeMinParty() );
        if ( challengePatchDto.getChallengeStartDate() != null ) {
            challenge.challengeStartDate( LocalDate.parse( challengePatchDto.getChallengeStartDate() ) );
        }
        if ( challengePatchDto.getChallengeEndDate() != null ) {
            challenge.challengeEndDate( LocalDate.parse( challengePatchDto.getChallengeEndDate() ) );
        }
        if(challengePatchDto.getChallengeDescription() != null)
            challenge.challengeAuthDescription( challengePatchDto.getChallengeAuthDescription() );
        if(challengePatchDto.getChallengeAuthCycle() != 0)
            challenge.challengeAuthCycle( challengePatchDto.getChallengeAuthCycle() );

        /*챌린지 인증 시간 추가*/
        List<String> list = challengePatchDto.getChallengeAuthAvailableTime();
        if ( list != null ) {
            challenge.challengeAuthAvailableTime( new ArrayList<String>( list ) );
        }

        /*챌린지 카테고리를 숫자로 받아 enum으로 변환하여 entity에 저장*/
        switch (challengePatchDto.getChallengeCategoryId()) {
            case 1:
                challenge.challengeCategory(Challenge.ChallengeCategory.BUCKET_LIST);
                break;
            case 2:
                challenge.challengeCategory(Challenge.ChallengeCategory.SHARED_CHALLENGE);
                break;
            case 3:
                challenge.challengeCategory(Challenge.ChallengeCategory.OFFLINE_CHALLENGE);
                break;
            default:
                challenge.challengeCategory(null);
                break;
        }
        if(challengePatchDto.getChallengeRepImagePath() != null)
            challenge.challengeRepImagePath(challengePatchDto.getChallengeRepImagePath());
        if(challengePatchDto.getChallengeExamImagePath() != null)
            challenge.challengeExamImagePath(challengePatchDto.getChallengeExamImagePath());

        return challenge.build();
    }


    default ChallengeDto.SimpleResponse challengeToChallengeSimpleResponseDto(Challenge challenge, ChallengeReviewMapper challengeReviewMapper,Member member) {
        if ( challenge == null) {
            return null;
        }

        ChallengeDto.SimpleResponse simpleResponse = new ChallengeDto.SimpleResponse();

        simpleResponse.setChallengeId( challenge.getChallengeId() );
        simpleResponse.setChallengeCategory( challenge.getChallengeCategory() );
        simpleResponse.setChallengeTitle( challenge.getChallengeTitle() );
        simpleResponse.setChallengeDescription( challenge.getChallengeDescription() );
        simpleResponse.setChallengeCurrentParty((int)Math.round(challenge.getChallengeCurrentParty()));
        simpleResponse.setChallengeMaxParty( challenge.getChallengeMaxParty() );
        simpleResponse.setChallengeMinParty( challenge.getChallengeMinParty() );
        simpleResponse.setChallengeStartDate( challenge.getChallengeStartDate() );
        simpleResponse.setChallengeEndDate( challenge.getChallengeEndDate() );
        simpleResponse.setChallengeAuthDescription( challenge.getChallengeAuthDescription() );
        simpleResponse.setChallengeAuthCycle( challenge.getChallengeAuthCycle() );
        simpleResponse.setChallengeAuthAvailableTime(challenge.getChallengeAuthAvailableTime());
        simpleResponse.setChallengeDirectLink( challenge.getChallengeDirectLink() );
        simpleResponse.setChallengeFeePerPerson( challenge.getChallengeFeePerPerson() );
        simpleResponse.setChallengeTotalReward(Math.round(challenge.getChallengeTotalReward()));
        simpleResponse.setChallengeViewCount( challenge.getChallengeViewCount() );
        simpleResponse.setCurrentMemberMoney(member.getMemberMoney());
        simpleResponse.setIsClosed( challenge.getIsClosed() );
        simpleResponse.setCreated_at( challenge.getCreatedAt() );
        simpleResponse.setUpdated_at( challenge.getUpdated_at() );
        //대표이미지
        simpleResponse.setChallengeRepImagePath(challenge.getChallengeRepImagePath());
        //예시이미지
        String[] challengeExamImagePaths = challenge.getChallengeExamImagePath().split(",");
        List<String> challengeExamImagePathList = new ArrayList<>();
        for (String imagePath : challengeExamImagePaths) {
            challengeExamImagePathList.add(imagePath);
        }
        simpleResponse.setChallengeExamImagePath(challengeExamImagePathList);

        if(!challenge.getChallengeReviewList().isEmpty()){
            List<ChallengeReviewDto.Response> challengeReviewResponseDtoList = new ArrayList<>();
            for(ChallengeReview challengeReview: challenge.getChallengeReviewList()){
                challengeReviewResponseDtoList.add(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview));
            }
            simpleResponse.setChallengeReviews(challengeReviewResponseDtoList);
        }
        simpleResponse.setIsSimpleResponse(true);

        return simpleResponse;
    }

    /**
     * 챌린지 => 챌린지 상세 페이지 조회 detail ResponseDto
     */
    default ChallengeDto.DetailResponse challengeToChallengeDetailResponseDto(Challenge challenge, ChallengeTalkMapper challengeTalkMapper, MemberService memberService, ChallengeReviewMapper challengeReviewMapper, Member member, MemberChallengeService memberChallengeService) {
        if ( challenge == null && challengeTalkMapper == null ) {
            return null;
        }

        ChallengeDto.DetailResponse.DetailResponseBuilder detailResponse = ChallengeDto.DetailResponse.builder();

        if ( challenge != null ) {
            detailResponse.challengeId( challenge.getChallengeId() );
            detailResponse.challengeCategory( challenge.getChallengeCategory() );
            detailResponse.challengeTitle( challenge.getChallengeTitle() );
            detailResponse.challengeDescription( challenge.getChallengeDescription() );
            detailResponse.challengeCurrentParty((int)Math.round(challenge.getChallengeCurrentParty()));
            detailResponse.challengeMaxParty( challenge.getChallengeMaxParty() );
            detailResponse.challengeMinParty( challenge.getChallengeMinParty() );
            detailResponse.challengeStartDate( challenge.getChallengeStartDate() );
            detailResponse.challengeEndDate( challenge.getChallengeEndDate() );
            detailResponse.challengeAuthDescription( challenge.getChallengeAuthDescription() );
            detailResponse.challengeAuthCycle( challenge.getChallengeAuthCycle() );
            detailResponse.challengeCurrentMemberTodayAuth(challenge.getMemberChallengeTodayCertCount());
            detailResponse.challengeAuthAvailableTime(challenge.getChallengeAuthAvailableTime());
            detailResponse.challengeDirectLink( challenge.getChallengeDirectLink() );
            detailResponse.challengeFeePerPerson( challenge.getChallengeFeePerPerson() );
            detailResponse.challengeTotalReward( Math.round(challenge.getChallengeTotalReward()));
            detailResponse.challengeViewCount( challenge.getChallengeViewCount() );
            detailResponse.isClosed( challenge.getIsClosed() );
            detailResponse.created_at( challenge.getCreatedAt() );
            detailResponse.updated_at( challenge.getUpdated_at() );
            detailResponse.averageChallengeSuccessRate(challenge.getChallengeSuccessRate());
            detailResponse.currentUserSuccessRate(memberChallengeService.findMemberChallengeByMemberAndChallenge(challenge, member).getMemberChallengeSuccessRate());

            // 챌린지 참가자에 대한 정보를 응답할 수 있게 detailResponse 필드에 등록해야함
            detailResponse.participatingMember(memberChallengeToMemberChallengeResponseDto(challenge.getMemberChallenges()));

            // 챌린지 인증사진을 리스트로 반환 해주는 필드
            detailResponse.challengeCertImages(challengeCertImageToChallengeCertImageResponseDto(challenge.getChallengeCertImages()));
            //대표이미지
            detailResponse.challengeRepImagePath(challenge.getChallengeRepImagePath());
            //예시이미지
            String[] challengeExamImagePaths = challenge.getChallengeExamImagePath().split(",");
            List<String> challengeExamImagePathList = new ArrayList<>();
            for (String imagePath : challengeExamImagePaths) {
                challengeExamImagePathList.add(imagePath);
            }
            detailResponse.challengeExamImagePath(challengeExamImagePathList);
            /*
            * 챌린지 댓글을 챌린지 ResponseDto로 변환
            */
            if(!challenge.getChallengeTalkList().isEmpty()){
                List<ChallengeTalkDto.response> challengeTalkResponseDtoList = new ArrayList<>();
                for(ChallengeTalk challengeTalk: challenge.getChallengeTalkList()){
                    challengeTalkResponseDtoList.add(challengeTalkMapper.challengeTalkToChallengeTalkResponseDto(challengeTalk, memberService.findMemberById(challengeTalk.getMemberId()).getMemberName()));
                }
                detailResponse.challengeTalks(challengeTalkResponseDtoList);
            }

            if(!challenge.getChallengeReviewList().isEmpty()){
                List<ChallengeReviewDto.Response> challengeReviewResponseDtoList = new ArrayList<>();
                for(ChallengeReview challengeReview: challenge.getChallengeReviewList()){
                    challengeReviewResponseDtoList.add(challengeReviewMapper.challengeReviewToChallengeReviewResponseDto(challengeReview));
                }
                detailResponse.challengeReviews(challengeReviewResponseDtoList);
            }
            detailResponse.isSimpleResponse(false);


        }
        return detailResponse.build();
    }

    default Set<ChallengeDto.MemberChallengeResponseDto> memberChallengeToMemberChallengeResponseDto(Set<MemberChallenge> memberChallenges) {
        return memberChallenges
                .stream()
                .map(memberChallenge -> ChallengeDto.MemberChallengeResponseDto
                        .builder()
                        .memberChallengeId(memberChallenge.getMemberChallengeId())
                        .challengeId(memberChallenge.getChallenge().getChallengeId())
                        .memberId(memberChallenge.getMember().getMemberId())
                        .participatingMemberName(memberChallenge.getMember().getMemberName())
                        .memberBadge(memberChallenge.getMember().getMemberBadge())
                        .memberSuccessDay((int)memberChallenge.getMemberSuccessDay())
                        .memberChallengeSuccessRate(memberChallenge.getMemberChallengeSuccessRate())
                        .build())
                .collect(Collectors.toSet());
    }

    default List<ChallengeDto.ChallengeCertImageResponseDto> challengeCertImageToChallengeCertImageResponseDto(List<ChallengeCertImage> certImages) {
        return certImages
                .stream()
                .map(certImage -> ChallengeDto.ChallengeCertImageResponseDto
                        .builder()
                        .memberId(certImage.getMemberId())
                        .imagePath(certImage.getImagePath())
                        .build()).collect(Collectors.toList());
    }

    /**
     *  (챌린지 to 챌린지 responseDto)의 MultiResponse 버전
     * @param challengeList
     * @param challengeReviewMapper
     * @return
     */
    default List<ChallengeDto.SimpleResponse> challengeListToSimpleResponseDtoList(List<Challenge> challengeList, ChallengeReviewMapper challengeReviewMapper){
        List<ChallengeDto.SimpleResponse> simpleResponseList = new ArrayList<>();

        Member member = new Member();
        for(Challenge challenge: challengeList){
            simpleResponseList.add(challengeToChallengeSimpleResponseDto(challenge, challengeReviewMapper,member));
        }

        return simpleResponseList;
    }
}
