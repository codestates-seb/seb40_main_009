package be.wiselife.member.mapper;

import be.wiselife.follow.entity.Follow;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    List<MemberDto.listResponse> memberListResponses(List<Member> memberList);
    // 회원 정보를 수정할때
    default Member memberPatchToMember(MemberDto.Patch patchMember) {
        Member member = new Member();

        member.setMemberName(patchMember.getMemberName());
        member.setMemberDescription(patchMember.getMemberDescription());
        member.setMemberImagePath(patchMember.getMemberImagePath());

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
        memberDetailResponse.setMemberChallengeTryCount((int)member.getMemberChallengeTryCount());
        memberDetailResponse.setMemberChallengeSuccessCount((int)member.getMemberChallengeSuccessCount());
        memberDetailResponse.setMemberChallengePercentage(member.getMemberChallengePercentage());
        memberDetailResponse.setMemberMoney(member.getMemberMoney());
        memberDetailResponse.setFollowerCount(member.getFollowerCount());
        memberDetailResponse.setMemberImagePath(member.getMemberImagePath());
        //멤버에 팔로워 정보뜨게 추가
        memberDetailResponse.setFollowers(followersToFollowResponseDto(member.getFollows()));
        memberDetailResponse.setFollowStatus(member.getFollowStatus());
        return memberDetailResponse;
    }

    // 전체 회원에 대해 조회하고 싶을때
    default MemberDto.listResponse memberToListResponse(Member member) {
        MemberDto.listResponse memberListResponse = new MemberDto.listResponse();

        memberListResponse.setMemberId(member.getMemberId());
        memberListResponse.setMemberName(member.getMemberName());
        memberListResponse.setMemberBadge(member.getMemberBadge());
        memberListResponse.setFollowerCount(member.getFollowerCount());
        memberListResponse.setCreated_at(member.getCreated_at());

        return memberListResponse;
    }

    default List<MemberDto.MemberFollowerResponseDto> followersToFollowResponseDto(Set<Follow> follows) {
        return follows
                .stream()
                .map(follower -> MemberDto.MemberFollowerResponseDto
                        .builder()
                        .followId(follower.getFollowId())
                        .followingId(follower.getFollowing().getMemberId())
                        .followerId(follower.getFollowerId())
                        .followerName(follower.getFollowerName())
                        .followStatus(follower.isFollow())
                        .build())
                .collect(Collectors.toList());
    }
}
