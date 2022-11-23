package be.wiselife.memberchallenge.entity;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.temporal.ChronoUnit;

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

    @Column(nullable = false)
    private double challengeObjDay=0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="challenge_id")
    private Challenge challenge;

    //더미 생성용 생성자
    public MemberChallenge(Long memberChallengeId, double memberReward, double memberSuccessDay, double memberChallengeSuccessRate, Member member, Challenge challenge) {
        this.memberChallengeId = memberChallengeId;
        this.memberReward = memberReward;
        this.memberSuccessDay = memberSuccessDay;
        this.memberChallengeSuccessRate = memberChallengeSuccessRate;
        this.member = member;
        this.challenge = challenge;
    }
}
