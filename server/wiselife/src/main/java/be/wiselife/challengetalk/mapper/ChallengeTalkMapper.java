package be.wiselife.challengetalk.mapper;

import be.wiselife.challengetalk.dto.ChallengeTalkDto;
import be.wiselife.challengetalk.entity.ChallengeTalk;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeTalkMapper {

    ChallengeTalk challengeTalkPostDtoToChallenge(ChallengeTalkDto.Post challengeTalkPostDto);
    ChallengeTalk challengeTalkPatchDtoToChallenge(ChallengeTalkDto.Patch challengeTalkPatchDto);

    default ChallengeTalkDto.response challengeTalkToChallengeTalkResponseDto(ChallengeTalk challengeTalk, String memberName) {
        if ( challengeTalk == null ) {
            return null;
        }

        ChallengeTalkDto.response response = new ChallengeTalkDto.response();

        response.setChallengeTalkBody( challengeTalk.getChallengeTalkBody() );
        response.setCreated_at( challengeTalk.getCreatedAt() );
        response.setUpdated_at( challengeTalk.getUpdated_at() );
        response.setMemberName(memberName);

        return response;
    }
}
