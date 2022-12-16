package be.wiselife.order.mapper;

import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-16T11:00:51+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16 (Azul Systems, Inc.)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order postInfoToOrder(OrderDto.OrderPostinfo postinfo) {
        if ( postinfo == null ) {
            return null;
        }

        Order.OrderBuilder order = Order.builder();

        order.itemName( postinfo.getItemName() );
        order.totalAmount( postinfo.getTotalAmount() );
        order.quantity( postinfo.getQuantity() );
        order.orderTax( postinfo.getOrderTax() );
        order.orderSuccess( postinfo.isOrderSuccess() );

        return order.build();
    }

    @Override
    public List<OrderDto.PersonalOrder> getOrderList(List<Order> orderList) {
        if ( orderList == null ) {
            return null;
        }

        List<OrderDto.PersonalOrder> list = new ArrayList<OrderDto.PersonalOrder>( orderList.size() );
        for ( Order order : orderList ) {
            list.add( orderToPersonalOrder( order ) );
        }

        return list;
    }

    protected OrderDto.PersonalOrder orderToPersonalOrder(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderDto.PersonalOrder.PersonalOrderBuilder personalOrder = OrderDto.PersonalOrder.builder();

        personalOrder.orderId( order.getOrderId() );
        personalOrder.approved_at( order.getApproved_at() );
        personalOrder.requestuniquenumber( order.getRequestuniquenumber() );
        personalOrder.itemName( order.getItemName() );
        personalOrder.totalAmount( (int) order.getTotalAmount() );

        return personalOrder.build();
    }
}
