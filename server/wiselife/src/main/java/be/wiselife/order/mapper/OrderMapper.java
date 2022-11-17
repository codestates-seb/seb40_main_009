package be.wiselife.order.mapper;

import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    Order postInfoToOrder(OrderDto.OrderPostinfo postinfo);

    List<OrderDto.PersonalOrder> getOrderList(List<Order> orderList);

    //오더내용을 오더테이블과 맴버테이블에 저장.
}
