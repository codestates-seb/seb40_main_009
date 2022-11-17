package be.wiselife.image.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("RI")
public class ReviewImage extends Image {
    private String imageType = "RI";
    private Long reviewId;
}
