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

    private Long followerMemberId;

    @Column(nullable = false)
    private boolean isFollow = false;

    private String followerName;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member followingMember;

    public Follower(Long followerMemberId,Member followingMember) {
        this.followerMemberId = followerMemberId;
        this.followingMember = followingMember;

    }

    public void setFollow(boolean isFollow) {
        this.isFollow = isFollow;
    }
}
