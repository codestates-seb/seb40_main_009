package be.wiselife.memberchallenge.entity;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="MemberChallenge_Table")
public class MemberChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberChallengeId;

    // 환급 받을 금액
    @Column(nullable = false)
    private double expectedRefundToMember =0;

    @Column(nullable = false)
    private double memberSuccessDay=0;

    @Column(nullable = false)
    private double memberChallengeSuccessRate=0;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="challenge_id")
    @JsonBackReference
    private Challenge challenge;

    public Long getMemberChallengeId() {
        return memberChallengeId;
    }

}
