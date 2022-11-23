package be.wiselife.member.mapper;

import be.wiselife.follow.entity.Follow;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.Comparator;
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
        memberDetailResponse.setMemberBadge(member.getMemberBadge());
        memberDetailResponse.setHasRedCard(member.isHasRedCard());
        memberDetailResponse.setMemberExp(member.getMemberExp());
        memberDetailResponse.setMemberChallengePercentage(member.getMemberChallengePercentage());
        memberDetailResponse.setMemberMoney(member.getMemberMoney());
        memberDetailResponse.setFollowerCount(member.getFollowerCount());
        memberDetailResponse.setMemberImagePath(member.getMemberImagePath());
        //멤버에 팔로워 정보뜨게 추가
        memberDetailResponse.setFollowers(followersToFollowResponseDto(member.getFollows()));
        memberDetailResponse.setFollowStatus(member.getFollowStatus());

        //참여중인 챌린지 정보뜨게 추가
        memberDetailResponse.setParticipatingChallenge(memberChallengeToMemberChallengeResponseDto(member.getMemberChallenges()));
        return memberDetailResponse;
    }

    // 전체 회원에 대해 조회하고 싶을때
    default MemberDto.listResponse memberToListResponse(Member member) {
        MemberDto.listResponse memberListResponse = new MemberDto.listResponse();

        memberListResponse.setMemberId(member.getMemberId());
        memberListResponse.setMemberName(member.getMemberName());
        memberListResponse.setMemberBadge(member.getMemberBadge());
        memberListResponse.setFollowerCount(member.getFollowerCount());
        memberListResponse.setCreated_at(member.getCreatedAt());

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

    default List<MemberDto.MemberChallengeResponseDto> memberChallengeToMemberChallengeResponseDto(List<MemberChallenge> memberChallenges) {

        return memberChallenges
                .stream()
                .map(memberChallenge -> MemberDto.MemberChallengeResponseDto
                        .builder()
                        .memberChallengeId(memberChallenge.getMemberChallengeId())
                        .challengeId(memberChallenge.getChallenge().getChallengeId())
                        .challengeTitle(memberChallenge.getChallenge().getChallengeTitle())
                        .memberSuccessDay((int) memberChallenge.getMemberSuccessDay())
                        .memberChallengeSuccessRate(memberChallenge.getMemberChallengeSuccessRate())
                        .objectPeriod(memberChallenge.getChallenge().getChallengeEndDate().getDayOfYear() - memberChallenge.getChallenge().getChallengeStartDate().getDayOfYear())
                        .memberReward(memberChallenge.getMemberReward())
                        .isClosed(memberChallenge.getChallenge().getIsClosed())
                        .build())
                .collect(Collectors.toList());
    }
}

