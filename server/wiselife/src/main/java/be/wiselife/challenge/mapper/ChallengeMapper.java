package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import org.mapstruct.Mapper;

import be.wiselife.challenge.entity.Challenge;


@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    Challenge challengePostDtoToChallenge(ChallengeDto.Post challengePostDto);
    ChallengeDto.Response challengeToChallengeResponseDto(Challenge challenge);
}
