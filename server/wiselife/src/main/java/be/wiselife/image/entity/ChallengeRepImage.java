package be.wiselife.image.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CRI")
public class ChallengeRepImage extends Image {
    private String imageType = "CRI";
    private Long challengeId;
}
