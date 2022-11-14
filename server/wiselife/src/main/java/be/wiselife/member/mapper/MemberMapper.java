package be.wiselife.member.mapper;

import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    List<MemberDto.listResponse> memberListResponses(List<Member> memberList);
    // 회원 정보를 수정할때
    default Member memberPatchToMember(MemberDto.Patch patchMember) {
        Member member = new Member();

        member.setMemberName(patchMember.getMemberName());
        member.setMemberDescription(patchMember.getMemberDescription());
        member.setMemberImage(member.getMemberImage());

        return member;
    }

    // 개인 회원에 대해 조회하고 싶을때
    default MemberDto.detailResponse memberToDetailResponse(Member member) {
        MemberDto.detailResponse memberDetailResponse = new MemberDto.detailResponse();

        memberDetailResponse.setMemberId(member.getMemberId());
        memberDetailResponse.setMemberDescription(member.getMemberDescription());
        memberDetailResponse.setMemberEmail(member.getMemberEmail());
        memberDetailResponse.setMemberName(member.getMemberName());
        memberDetailResponse.setMemberExp(member.getMemberExp());
        memberDetailResponse.setMemberBadge(member.getMemberBadge());
        memberDetailResponse.setHasRedCard(member.isHasRedCard());
        memberDetailResponse.setMemberChallengeTotalCount(member.getMemberChallengeTotalCount());
        memberDetailResponse.setMemberChallengeSuccessCount(member.getMemberChallengeSuccessCount());
        memberDetailResponse.setMemberChallengePercentage(member.getMemberChallengePercentage());
        memberDetailResponse.setMemberMoney(member.getMemberMoney());
        memberDetailResponse.setFollowers(member.getFollowers());
        memberDetailResponse.setMemberImage(member.getMemberImage());

        return memberDetailResponse;
    }

    // 전체 회원에 대해 조회하고 싶을때
    default MemberDto.listResponse memberToListResponse(Member member) {
        MemberDto.listResponse memberListResponse = new MemberDto.listResponse();

        memberListResponse.setMemberId(member.getMemberId());
        memberListResponse.setMemberName(member.getMemberName());
        memberListResponse.setMemberBadge(member.getMemberBadge());
        memberListResponse.setFollowers(member.getFollowers());
        memberListResponse.setCreated_at(member.getCreated_at());

        return memberListResponse;
    }
}
