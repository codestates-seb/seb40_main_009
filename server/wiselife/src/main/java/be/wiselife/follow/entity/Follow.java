package be.wiselife.follow.entity;

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
@Table(name="Follow_Table")
public class Follow extends TimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @Column(nullable = false)
    private Long followerId;

    private String followerName;

    @Column(nullable = false)
    private boolean isFollow = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member following;

    public Follow(Long followerId, Member following) {
        this.followerId = followerId;
        this.following = following;

    }

    public void setFollow(boolean isFollow) {
        this.isFollow = isFollow;
    }
}
