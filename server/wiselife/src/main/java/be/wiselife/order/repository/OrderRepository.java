package be.wiselife.order.repository;

import be.wiselife.order.entity.Order;
import be.wiselife.quesrydslrepo.QuerydslRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> , QuerydslRepository {
     Optional<Order> findByTid(String tid);

}
