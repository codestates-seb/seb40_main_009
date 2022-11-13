package be.wiselife.order.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Builder
@Entity
@Table(name = "ORDERLOG_TABLE")
public class OrderLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderLogId; //결제log번호
    @Column(nullable = false)
    private String pgToken; //카톡에서 주는 pgToken
    @Column(nullable = false)
    private String orderDate; //결제 발생날짜
    @Column(nullable = false)
    private String orderLogger; // 로그 찍힌 위치
    @Column(nullable = false)
    private String orderLv; // 로그 레벨
    @Column(nullable = false)
    private String orderLogMessage; // 로그 메시지

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    public OrderLog() {

    }
}
