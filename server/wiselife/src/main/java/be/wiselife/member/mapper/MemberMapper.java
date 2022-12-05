package be.wiselife.member.mapper;

import be.wiselife.follow.entity.Follow;
import be.wiselife.member.dto.MemberDto;
import be.wiselife.member.entity.Member;
import be.wiselife.memberchallenge.entity.MemberChallenge;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface MemberMapper {
    List<MemberDto.listResponse> memberListResponses(List<Member> memberList);
    // 회원 정보를 수정할때
    default Member memberPatchToMember(MemberDto.Patch patchMember) {
        if(patchMember == null)
            return null;
        Member member = new Member();
        member.setMemberName(patchMember.getMemberName());
        member.setMemberDescription(patchMember.getMemberDescription());

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

        //진행중인 챌린지 정보뜨게 추가
        memberDetailResponse.setParticipatingChallenges(proceedingChallengeToMemberChallengeResponseDto(member.getMemberChallenges()));
        memberDetailResponse.setEndChallenges(endChallengeToMemberChallengeResponseDto(member.getMemberChallenges()));

        //다음 레벨까지 남은 필요경험치를 퍼센트로 표현
        double presentExp = member.getMemberExp();
        System.out.println("presentExp = " + presentExp);
        int preObjExp = Member.MemberBadge.badgeOfobjExperience(member.getMemberLevel());
        System.out.println("preObjExp = " + preObjExp);
        int nextObjExp = Member.MemberBadge.badgeOfobjExperience(member.getMemberLevel()+1);
        double memberExpObjRate=0;
        if (member.getMemberLevel() > 8) {
            memberExpObjRate = 100.0;
        } else {
            memberExpObjRate=((presentExp- preObjExp) /(nextObjExp- preObjExp))*100;
        }



        memberDetailResponse.setMemberExpObjRate(memberExpObjRate);

        return memberDetailResponse;
    }

    // 전체 회원에 대해 조회하고 싶을때
    default MemberDto.listResponse memberToListResponse(Member member) {
        MemberDto.listResponse memberListResponse = new MemberDto.listResponse();

        memberListResponse.setMemberId(member.getMemberId());
        memberListResponse.setMemberImagePath(member.getMemberImagePath());
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

    //진행중인 챌린지 리스트
    default List<MemberDto.MemberChallengeResponseDto> proceedingChallengeToMemberChallengeResponseDto(List<MemberChallenge> memberChallenges) {

        return memberChallenges
                .stream()
                .sorted(Comparator.comparing(MemberChallenge::getMemberChallengeId).reversed())
                .filter(memberChallenge -> memberChallenge.getChallenge().getIsClosed()==false)
                .map(memberChallenge -> MemberDto.MemberChallengeResponseDto
                        .builder()
                        .memberChallengeId(memberChallenge.getMemberChallengeId())
                        .challengeId(memberChallenge.getChallenge().getChallengeId())
                        .challengeTitle(memberChallenge.getChallenge().getChallengeTitle())
                        .challengeRepImage(memberChallenge.getChallenge().getChallengeRepImagePath())
                        .memberSuccessDay((int) memberChallenge.getMemberSuccessDay())
                        .objDay(ChronoUnit.DAYS.between(memberChallenge.getChallenge().getChallengeStartDate(), memberChallenge.getChallenge().getChallengeEndDate()))
                        .memberChallengeSuccessRate(memberChallenge.getMemberChallengeSuccessRate())
                        .memberReward(memberChallenge.getExpectedRefundToMember())
                        .isClosed(memberChallenge.getChallenge().getIsClosed())
                        .build())
                .collect(Collectors.toList());
    }
    //참여했던 챌린지 리스트
    default List<MemberDto.MemberChallengeResponseDto> endChallengeToMemberChallengeResponseDto(List<MemberChallenge> memberChallenges) {

        return memberChallenges
                .stream()
                .sorted(Comparator.comparing(MemberChallenge::getMemberChallengeId).reversed())
                .filter(memberChallenge -> memberChallenge.getChallenge().getIsClosed()==true)
                .map(memberChallenge -> MemberDto.MemberChallengeResponseDto
                        .builder()
                        .memberChallengeId(memberChallenge.getMemberChallengeId())
                        .challengeId(memberChallenge.getChallenge().getChallengeId())
                        .challengeTitle(memberChallenge.getChallenge().getChallengeTitle())
                        .challengeRepImage(memberChallenge.getChallenge().getChallengeRepImagePath())
                        .memberSuccessDay((int) memberChallenge.getMemberSuccessDay())
                        .objDay(ChronoUnit.DAYS.between(memberChallenge.getChallenge().getChallengeStartDate(), memberChallenge.getChallenge().getChallengeEndDate()))
                        .memberChallengeSuccessRate(memberChallenge.getMemberChallengeSuccessRate())
                        .memberReward(memberChallenge.getExpectedRefundToMember())
                        .isClosed(memberChallenge.getChallenge().getIsClosed())
                        .build())
                .collect(Collectors.toList());
    }

}

