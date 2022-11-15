package be.wiselife.order.mapper;

import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    Order postInfoToOrder(OrderDto.OrderPostinfo postinfo);
}
