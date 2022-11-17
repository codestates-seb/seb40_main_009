package be.wiselife.image.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CMI")
@Setter
@Getter
public class ChallengeExamImage extends Image{
    private String imageType = "CMI";
    private String randomIdForImage;
}
