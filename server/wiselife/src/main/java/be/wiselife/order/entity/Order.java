package be.wiselife.order.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
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

    @OneToMany(mappedBy = "order", cascade = CascadeType.PERSIST)
    private List<OrderLog> orderLogList = new ArrayList<>();

    public Order() {

    }
}
