package be.wiselife.image.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("MI")
@Setter
@Getter
public class MemberImage extends Image {
    private String imageType = "MI";
    private Long memberId;
}