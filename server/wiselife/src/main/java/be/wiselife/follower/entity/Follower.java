package be.wiselife.follower.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name="Follower_Table")
public class Follower extends TimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerId;

    private Long followingId;

    @Column(nullable = false)
    private boolean isFollow = false;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public Follower(Long followingId, Member member) {
        this.followingId = followingId;
        this.member = member;
    }
}
