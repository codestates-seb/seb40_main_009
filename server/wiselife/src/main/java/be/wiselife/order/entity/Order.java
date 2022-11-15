package be.wiselife.order.entity;

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
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    @Column(nullable = false)
    private String itemName;
    @Column(nullable = false)
    private double totalAmount;
    @Column(nullable = false)
    private int quantity;
    @Column(nullable = false)
    private int orderTax;
    @Column(unique = true)
    private String tid; //결제번호



//    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
//    private List<OrderLog> orderLogList = new ArrayList<>();

}
