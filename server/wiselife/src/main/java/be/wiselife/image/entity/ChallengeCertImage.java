package be.wiselife.image.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CCI")
public class ChallengeCertImage extends Image {
    private String imageType = "CCI";
    private Long challengeId;
}
