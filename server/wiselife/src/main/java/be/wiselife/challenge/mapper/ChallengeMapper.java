package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import org.mapstruct.Mapper;

import be.wiselife.challenge.entity.Challenge;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDate;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeMapper {
    ChallengeDto.SimpleResponse challengeToChallengeSimpleResponseDto(Challenge challenge);
    ChallengeDto.DetailResponse challengeToChallengeDetailResponseDto(Challenge challenge);

    /*챌린지 생성 mapping*/
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

        return challenge.build();
    }

    /*챌린지 수정 mapping*/
    default Challenge challengePatchDtoToChallenge(ChallengeDto.Patch challengePatchDto) {
        if ( challengePatchDto == null ) {
            return null;
        }

        Challenge.ChallengeBuilder challenge = Challenge.builder();
        challenge.challengeId(challengePatchDto.getChallengeId());
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

        return challenge.build();
    }
}
