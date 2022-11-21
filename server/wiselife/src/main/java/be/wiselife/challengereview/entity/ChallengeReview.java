package be.wiselife.challengereview.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.image.entity.ReviewImage;
import be.wiselife.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ChallengeReview extends TimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeReviewId;
    @Setter
    @Column(nullable = false)
    private String challengeReviewTitle;
    @Setter
    @Column(nullable = false)
    private String challengeReviewContent;
    @Setter
    @Column(nullable = false)
    private int challengeReviewStar;
    @Setter
    private String challengeReviewImagePath;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    @Setter
    private Member member;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @ToString.Exclude
    @Setter
    private Challenge challenge;

    @Builder
    public ChallengeReview(Long challengeReviewId, String challengeReviewTitle, String challengeReviewContent, int challengeReviewStar, String challengeReviewImagePath, Member member, Challenge challenge) {
        this.challengeReviewId = challengeReviewId;
        this.challengeReviewTitle = challengeReviewTitle;
        this.challengeReviewContent = challengeReviewContent;
        this.challengeReviewStar = challengeReviewStar;
        this.challengeReviewImagePath = challengeReviewImagePath;
    }


}
