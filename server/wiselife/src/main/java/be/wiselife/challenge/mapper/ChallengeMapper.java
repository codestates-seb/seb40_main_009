package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeResponseDto;
import lombok.Builder;
import org.mapstruct.Mapper;
import be.wiselife.challenge.dto.ChallengePostDto;
import be.wiselife.challenge.entity.Challenge;


@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    Challenge challengePostDtoToChallenge(ChallengePostDto challengePostDto);
    ChallengeResponseDto challengeToChallengeResponseDto(Challenge challenge);
}
