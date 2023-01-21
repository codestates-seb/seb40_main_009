package be.wiselife.challengereview.mapper;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import be.wiselife.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeReviewMapper {

    public ChallengeReview challengeReviewPatchDtoToChallengeReview(ChallengeReviewDto.Patch challengeReviewPatchDto);

    default ChallengeReview challengeReviewPostDtoToChallengeReview(ChallengeReviewDto.Post challengeReviewPostDto) {
        if ( challengeReviewPostDto == null ) {
            return null;
        }

        ChallengeReview.ChallengeReviewBuilder challengeReview = ChallengeReview.builder();

        challengeReview.challengeReviewTitle( challengeReviewPostDto.getChallengeReviewTitle() );
        challengeReview.challengeReviewContent( challengeReviewPostDto.getChallengeReviewContent() );
        challengeReview.challengeReviewStar( challengeReviewPostDto.getChallengeReviewStar() );

        return challengeReview.build();
    }

    default ChallengeReviewDto.Response challengeReviewToChallengeReviewResponseDto(ChallengeReview challengeReview) {
        if ( challengeReview == null ) {
            return null;
        }

        ChallengeReviewDto.Response response = new ChallengeReviewDto.Response();

        response.setChallengeReviewId(challengeReview.getChallengeReviewId());
        /* 챌린지 객체를 그대로 전달할 수 없으니 id만 전달*/
        response.setChallengeId(challengeReview.getChallenge().getChallengeId());
        response.setChallengeReviewTitle( challengeReview.getChallengeReviewTitle() );
        response.setChallengeReviewContent( challengeReview.getChallengeReviewContent() );
        response.setChallengeReviewStar(challengeReview.getChallengeReviewStar() );
        response.setChallengeReviewImagePath( challengeReview.getChallengeReviewImagePath() );
        response.setMemberName(challengeReview.getMember().getMemberName());
        response.setMemberBadge(challengeReview.getMember().getMemberBadge());

        return response;
    }
}
