package be.wiselife.audit;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class WriterAudit extends TimeAudit{
    /**
     * 생성자, 수정자는 일부 엔티티에 적용 되나, TimeAudit가 필요하므로 TimeAudit를 상속받게 설계함
     */
    @Column(updatable = false)
    private String create_by_member;

    @Column
    private String updated_by_member;
}
