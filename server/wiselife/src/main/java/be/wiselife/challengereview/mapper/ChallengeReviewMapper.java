package be.wiselife.challengereview.mapper;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeReviewMapper {

    public ChallengeReview challengeReviewPostDtoToChallengeReview(ChallengeReviewDto.Post challengeReviewPostDto);

    default ChallengeReviewDto.Response challengeReviewToChallengeReviewResponseDto(ChallengeReview challengeReview) {
        if ( challengeReview == null ) {
            return null;
        }

        ChallengeReviewDto.Response response = new ChallengeReviewDto.Response();

        response.setChallengeReviewId(challengeReview.getChallengeReviewId());
        response.setChallengeId(challengeReview.getChallenge().getChallengeId());
        response.setChallengeReviewTitle( challengeReview.getChallengeReviewTitle() );
        response.setChallengeReviewContent( challengeReview.getChallengeReviewContent() );
        response.setChallengeReviewStar(challengeReview.getChallengeReviewStar() );
        response.setChallengeReviewImagePath( challengeReview.getChallengeReviewImagePath() );
        response.setMemberName(challengeReview.getMember().getMemberName());

        return response;
    }
}
