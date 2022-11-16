package be.wiselife.order.entity;

import be.wiselife.audit.TimeAudit;
import be.wiselife.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
@Table(name = "ORDER_TABLE")
public class Order extends TimeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId; //결제번호(자체)
    @Column(nullable = false)
    private String itemName; //상품명
    @Column(nullable = false)
    private double totalAmount; //결제금액
    @Column(nullable = false)
    private int quantity; //상품수량
    @Column(nullable = false)
    private int orderTax; //부가세
    @Column(unique = true)
    private String tid; //결제번호(카톡발행)
    @Column
    private Boolean orderSuccess; //거래전 False는 거래후 True;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }
}
