package be.wiselife.image.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CCI")
@Setter
@Getter
public class ChallengeCertImage extends Image {
    private String imageType = "CCI";
    private Long challengeId;
}
