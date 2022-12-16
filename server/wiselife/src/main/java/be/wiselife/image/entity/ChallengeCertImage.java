package be.wiselife.image.entity;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@DiscriminatorValue("CCI")
@Setter
@Getter
public class ChallengeCertImage extends Image {
    private String imageType = "CCI";

    //챌린지 생성시 이미지를 넣을때, 데이터베이스에서 기본키를 구할 수 없으므로, 이 필드로 기본키 역할을 대체한다.
    private String randomIdForImage;

    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;
}
