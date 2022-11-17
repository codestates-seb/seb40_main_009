package be.wiselife.image.repository;

import be.wiselife.image.entity.Image;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long>, QuerydslRepository {
}
