package be.wiselife.challengereview.mapper;

import be.wiselife.challengereview.dto.ChallengeReviewDto;
import be.wiselife.challengereview.entity.ChallengeReview;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-16T11:00:51+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class ChallengeReviewMapperImpl implements ChallengeReviewMapper {

    @Override
    public ChallengeReview challengeReviewPatchDtoToChallengeReview(ChallengeReviewDto.Patch challengeReviewPatchDto) {
        if ( challengeReviewPatchDto == null ) {
            return null;
        }

        ChallengeReview.ChallengeReviewBuilder challengeReview = ChallengeReview.builder();

        challengeReview.challengeReviewId( challengeReviewPatchDto.getChallengeReviewId() );
        challengeReview.challengeReviewTitle( challengeReviewPatchDto.getChallengeReviewTitle() );
        challengeReview.challengeReviewContent( challengeReviewPatchDto.getChallengeReviewContent() );
        challengeReview.challengeReviewStar( challengeReviewPatchDto.getChallengeReviewStar() );

        return challengeReview.build();
    }
}
