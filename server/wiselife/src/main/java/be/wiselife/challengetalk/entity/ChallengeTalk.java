package be.wiselife.challengetalk.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.entity.QChallenge;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ChallengeTalk extends TimeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeTalkId;
    @Setter
    @Column(nullable = false)
    private String challengeTalkBody;
    /*
    ERD상으로는 닉네임으로 되어있는데 불변하는 memberId로 설정하는게 좋겠다.
    우리가 간단하게 구현하기 위해서 member와의 연관관계 매핑 안했는기에
    별도로 member가 memberName 수정하면 이게 자동으로 반영 안되기 때문!!!!!!!!!!!!!!!!!!!!!
     */
    @Column(nullable = false, updatable = false)
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @ToString.Exclude
    private Challenge challenge;

    @Builder
    public ChallengeTalk(Long challengeTalkId, String challengeTalkBody, Long memberId) {
        this.challengeTalkId = challengeTalkId;
        this.challengeTalkBody = challengeTalkBody;
        this.memberId = memberId;
    }

    /*양방향 매핑 설정(+ 중복 설정 방지)*/
    public void setChallenge(Challenge challenge){
        this.challenge = challenge;
        if(!this.challenge.getChallengeTalkList().contains(this)){
            this.challenge.addChallengeTalk(this);
        }
    }
}
