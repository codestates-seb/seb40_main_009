package be.wiselife.memberchallenge.entity;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name="MemberChallenge_Table")
public class MemberChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberChallengeId;

    // 성공시 상금
    @Column(nullable = false)
    private double memberReward=0;

    @Column(nullable = false)
    private double memberSuccessDay=0;

    @Column(nullable = false)
    private double memberChallengeSuccessRate=0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="challenge_id")
    private Challenge challenge;


}
