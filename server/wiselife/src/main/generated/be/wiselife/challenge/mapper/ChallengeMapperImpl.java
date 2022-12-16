package be.wiselife.challenge.mapper;

import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challenge.entity.Challenge;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-16T16:23:22+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class ChallengeMapperImpl implements ChallengeMapper {

    @Override
    public List<ChallengeDto.ChallengeTitleResponse> challengeListToChallengeTitleResponseList(List<Challenge> challengeList) {
        if ( challengeList == null ) {
            return null;
        }

        List<ChallengeDto.ChallengeTitleResponse> list = new ArrayList<ChallengeDto.ChallengeTitleResponse>( challengeList.size() );
        for ( Challenge challenge : challengeList ) {
            list.add( challengeToChallengeTitleResponse( challenge ) );
        }

        return list;
    }

    protected ChallengeDto.ChallengeTitleResponse challengeToChallengeTitleResponse(Challenge challenge) {
        if ( challenge == null ) {
            return null;
        }

        String challengeTitle = null;

        challengeTitle = challenge.getChallengeTitle();

        ChallengeDto.ChallengeTitleResponse challengeTitleResponse = new ChallengeDto.ChallengeTitleResponse( challengeTitle );

        return challengeTitleResponse;
    }
}
