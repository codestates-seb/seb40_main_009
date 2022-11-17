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
    private String randomIdForImage;
}
