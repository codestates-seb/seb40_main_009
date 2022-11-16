package be.wiselife.challengetalk.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Entity
public class ChallengeTalk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long challengeTalkId;

    private String challengeTalkBody;

    private String memberName;

    @Builder
    public ChallengeTalk(Long challengeTalkId, String challengeTalkBody, String memberName) {
        this.challengeTalkId = challengeTalkId;
        this.challengeTalkBody = challengeTalkBody;
        this.memberName = memberName;
    }
}
