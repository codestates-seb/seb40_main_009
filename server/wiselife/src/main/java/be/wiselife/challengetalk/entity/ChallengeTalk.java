package be.wiselife.challengetalk.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.audit.WriterAudit;
import be.wiselife.challenge.entity.Challenge;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ChallengeTalk extends WriterAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeTalkId;
    @Setter
    @Column(nullable = false)
    private String challengeTalkBody;

    @Setter
    @Column(updatable = false)
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    @ToString.Exclude
    @JsonBackReference
    private Challenge challenge;

    @Builder
    public ChallengeTalk(Long challengeTalkId, String challengeTalkBody, Long memberId) {
        this.challengeTalkId = challengeTalkId;
        this.challengeTalkBody = challengeTalkBody;
        this.memberId = memberId;
    }

    /**
     * 양방향 매핑 설정(+ 중복 설정 방지)
     */
    public void setChallenge(Challenge challenge){
        this.challenge = challenge;
        if(!this.challenge.getChallengeTalkList().contains(this)){
            this.challenge.addChallengeTalk(this);
        }
    }
}
