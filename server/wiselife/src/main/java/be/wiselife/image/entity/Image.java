package be.wiselife.image.entity;


import be.wiselife.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name="Image_Table")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @Column(nullable = false)
    private String imagePath;

    @Enumerated(EnumType.STRING)
    private ImageSource imageSource;

    public enum ImageSource {
        USER_IMAGE,CHALLENGE_EXAM,CHALLENGE_REP,CERTIFICATION,REVIEW;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
