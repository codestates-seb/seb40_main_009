package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import be.wiselife.challengetalk.mapper.ChallengeTalkMapper;
import be.wiselife.member.service.MemberService;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import org.mapstruct.Mapper;

import be.wiselife.challenge.entity.Challenge;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeMapper {

//<<<<<<< HEAD
//    Challenge certPostDtoToChallenge(ChallengeDto.CertPost certPost);
//=======
    Challenge certDtoToChallenge(ChallengeDto.Cert cert);
    List<ChallengeDto.SimpleResponse> challengeListToSimpleResponseList(List<Challenge> challengeList);

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
        challenge.challengeExamImagePath(challengePostDto.getChallengeExamImagePath());
        challenge.challengeRepImagePath(challengePostDto.getChallengeRepImagePath());

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
        challenge.challengeTitle( challengePatchDto.getChallengeTitle() );
        challenge.challengeDescription( challengePatchDto.getChallengeDescription() );
        challenge.challengeMaxParty( challengePatchDto.getChallengeMaxParty() );
        challenge.challengeMinParty( challengePatchDto.getChallengeMinParty() );
        if ( challengePatchDto.getChallengeStartDate() != null ) {
            challenge.challengeStartDate( LocalDate.parse( challengePatchDto.getChallengeStartDate() ) );
        }
        if ( challengePatchDto.getChallengeEndDate() != null ) {
            challenge.challengeEndDate( LocalDate.parse( challengePatchDto.getChallengeEndDate() ) );
        }
        challenge.challengeAuthDescription( challengePatchDto.getChallengeAuthDescription() );
        challenge.challengeAuthCycle( challengePatchDto.getChallengeAuthCycle() );
        challenge.challengeFeePerPerson( challengePatchDto.getChallengeFeePerPerson() );

        /*챌린지 카테고리를 숫자로 받아 enum으로 변환하여 entity에 저장*/
        switch (challengePatchDto.getChallengeCategoryId()){
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
        challenge.challengeRepImagePath(challengePatchDto.getChallengeRepImagePath());

        challenge.challengeExamImagePath(challengePatchDto.getChallengeExamImagePath());


        return challenge.build();
    }


    default ChallengeDto.SimpleResponse challengeToChallengeSimpleResponseDto(Challenge challenge) {
        if ( challenge == null ) {
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
        simpleResponse.setChallengeDirectLink( challenge.getChallengeDirectLink() );
        simpleResponse.setChallengeFeePerPerson( challenge.getChallengeFeePerPerson() );
        simpleResponse.setChallengeTotalReward( challenge.getChallengeTotalReward() );
        simpleResponse.setChallengeViewCount( challenge.getChallengeViewCount() );
        simpleResponse.setIsClosed( challenge.getIsClosed() );
        simpleResponse.setCreated_at( challenge.getCreatedAt() );
        simpleResponse.setUpdated_at( challenge.getUpdated_at() );
        simpleResponse.setChallengeRepImagePath( challenge.getChallengeRepImagePath() );

        /**
         * 프론트에 응답할때는 challengeExamImagePath를 리스트 형태로 준다.
         */
        String[] challengeExamImagePaths = challenge.getChallengeExamImagePath().split(",");
        List<String> challengeExamImagePathList = new ArrayList<>();
        for (String imagePath : challengeExamImagePaths) {
            challengeExamImagePathList.add(imagePath);
        }
        simpleResponse.setChallengeExamImagePath(challengeExamImagePathList);

        /**
         * 프론트에 응답할때는 challengeCertImagePath를 리스트 형태로 준다.
         */
        if (!(challenge.getChallengeCertImagePath() == null)) {
            String[] challengeCertImagePaths = challenge.getChallengeCertImagePath().split(",");
            List<String> challengeCertImagePathList = new ArrayList<>();
            int certCount = 0;
            for (String imagePath : challengeCertImagePaths) {
                challengeCertImagePathList.add(imagePath);
            }
            simpleResponse.setChallengeCertImagePath(challengeCertImagePathList);
        }
        return simpleResponse;
    }

    /**
     * 챌린지 => 챌린지 상세 페이지 조회 detail ResponseDto
     */
    default ChallengeDto.DetailResponse challengeToChallengeDetailResponseDto(Challenge challenge, ChallengeTalkMapper challengeTalkMapper, MemberService memberService) {
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
            detailResponse.challengeDirectLink( challenge.getChallengeDirectLink() );
            detailResponse.challengeFeePerPerson( challenge.getChallengeFeePerPerson() );
            detailResponse.challengeTotalReward( challenge.getChallengeTotalReward() );
            detailResponse.challengeViewCount( challenge.getChallengeViewCount() );
            detailResponse.isClosed( challenge.getIsClosed() );
            detailResponse.created_at( challenge.getCreatedAt() );
            detailResponse.updated_at( challenge.getUpdated_at() );

            // 챌린지 참가자에 대한 정보를 응답할 수 있게 detailResponse 필드에 등록해야함
            detailResponse.participatingMember(memberChallengeToMemberChallengeResponseDto(challenge.getMemberChallenges()));

            /*
            * 챌린지 댓글을 챌린지 ResponseDto로 변환
            * 챌린지 자체는 memberId를 저장하기에 이를 실제 화면상 보이는 memberName으로 보여줘야 하기에
            * ChallengeTalkMapper ,MemberService 까지 사용해야 한다...
            */
            if(!challenge.getChallengeTalkList().isEmpty()){
                List<ChallengeTalkDto.response> challengeTalkResponseDtoList = new ArrayList<>();
                for(ChallengeTalk challengeTalk: challenge.getChallengeTalkList()){
                    challengeTalkResponseDtoList.add(challengeTalkMapper.challengeTalkToChallengeTalkResponseDto(challengeTalk, memberService.findMemberById(challengeTalk.getMemberId()).getMemberName()));
                }
                detailResponse.challengeTalks(challengeTalkResponseDtoList);
            }
            /**
             * 프론트에 응답할때는 challengeExamImagePath를 리스트 형태로 준다.
             */
            String[] challengeExamImagePaths = challenge.getChallengeExamImagePath().split(",");
            List<String> challengeExamImagePathList = new ArrayList<>();
            for (String imagePath : challengeExamImagePaths) {
                challengeExamImagePathList.add(imagePath);
            }
            detailResponse.challengeExamImagePath(challengeExamImagePathList);

            /**
             * 프론트에 응답할때는 challengeCertImagePath를 리스트 형태로 준다.
             */
            if (!(challenge.getChallengeCertImagePath() == null)) {
                String[] challengeCertImagePaths = challenge.getChallengeCertImagePath().split(",");
                List<String> challengeCertImagePathList = new ArrayList<>();
                for (String imagePath : challengeCertImagePaths) {
                    challengeCertImagePathList.add(imagePath);
                }
                detailResponse.challengeCertImagePath(challengeCertImagePathList);
            }
        }
        return detailResponse.build();
    }

    default List<ChallengeDto.MemberChallengeResponseDto> memberChallengeToMemberChallengeResponseDto(List<MemberChallenge> memberChallenges) {
        return memberChallenges
                .stream()
                .map(memberChallenge -> ChallengeDto.MemberChallengeResponseDto
                        .builder()
                        .memberChallengeId(memberChallenge.getMemberChallengeId())
                        .challengeId(memberChallenge.getChallenge().getChallengeId())
                        .participatingMemberName(memberChallenge.getMember().getMemberName())
                        .memberSuccessDay((int)memberChallenge.getMemberSuccessDay())
                        .memberChallengeSuccessRate(memberChallenge.getMemberChallengeSuccessRate())
                        .build())
                .collect(Collectors.toList());
    }
}
