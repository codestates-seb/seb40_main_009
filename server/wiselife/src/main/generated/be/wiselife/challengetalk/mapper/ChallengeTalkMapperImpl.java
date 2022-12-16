package be.wiselife.challengetalk.mapper;

import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-16T11:00:51+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class ChallengeTalkMapperImpl implements ChallengeTalkMapper {

    @Override
    public ChallengeTalk challengeTalkPostDtoToChallenge(ChallengeTalkDto.Post challengeTalkPostDto) {
        if ( challengeTalkPostDto == null ) {
            return null;
        }

        ChallengeTalk.ChallengeTalkBuilder challengeTalk = ChallengeTalk.builder();

        challengeTalk.challengeTalkBody( challengeTalkPostDto.getChallengeTalkBody() );

        return challengeTalk.build();
    }

    @Override
    public ChallengeTalk challengeTalkPatchDtoToChallenge(ChallengeTalkDto.Patch challengeTalkPatchDto) {
        if ( challengeTalkPatchDto == null ) {
            return null;
        }

        ChallengeTalk.ChallengeTalkBuilder challengeTalk = ChallengeTalk.builder();

        challengeTalk.challengeTalkId( challengeTalkPatchDto.getChallengeTalkId() );
        challengeTalk.challengeTalkBody( challengeTalkPatchDto.getChallengeTalkBody() );

        return challengeTalk.build();
    }
}
