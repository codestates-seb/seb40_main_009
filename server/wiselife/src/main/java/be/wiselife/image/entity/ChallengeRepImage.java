package be.wiselife.image.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("CRI")
@Setter
@Getter
public class ChallengeRepImage extends Image {
    private String imageType = "CRI";

    //챌린지 생성시 이미지를 넣을때, 데이터베이스에서 기본키를 구할 수 없으므로, 이 필드로 기본키 역할을 대체한다.
    private String randomIdForImage;
}
