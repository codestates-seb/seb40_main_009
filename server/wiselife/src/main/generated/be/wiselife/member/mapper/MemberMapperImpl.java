package be.wiselife.member.mapper;

import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
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
public class MemberMapperImpl implements MemberMapper {

    @Override
    public List<MemberDto.listResponse> memberListResponses(List<Member> memberList) {
        if ( memberList == null ) {
            return null;
        }

        List<MemberDto.listResponse> list = new ArrayList<MemberDto.listResponse>( memberList.size() );
        for ( Member member : memberList ) {
            list.add( memberToListResponse( member ) );
        }

        return list;
    }
}
