package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import org.mapstruct.Mapper;

import be.wiselife.challenge.entity.Challenge;

import java.time.LocalDate;


@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    ChallengeDto.Response challengeToChallengeResponseDto(Challenge challenge);

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
}
