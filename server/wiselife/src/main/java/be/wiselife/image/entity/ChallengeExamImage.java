package be.wiselife.image.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CMI")
public class ChallengeExamImage extends Image{
    private String imageType = "CMI";
    private Long challengeId;
}
