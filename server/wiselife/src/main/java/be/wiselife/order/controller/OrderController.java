package be.wiselife.order.controller;

import be.wiselife.dto.AmountResponseDto;
import be.wiselife.dto.MultiResponseDto;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import be.wiselife.order.mapper.OrderMapper;
import be.wiselife.order.service.OrderService;
import be.wiselife.security.JwtTokenizer;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/order")
@Slf4j
@RequiredArgsConstructor
@SessionAttributes("tid")
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 
     * @param postInfo : 카카오톡 측에서 요구하는 상품명, 금액, 수량, tax 그리고 거래완료여부를 보기위한 boolean이있다.
     * @param request : 
     * @return
     * @throws IOException
     */
    @PostMapping("/ready")
    public @ResponseBody ResponseEntity startContract(@RequestBody OrderDto.OrderPostinfo postInfo, HttpServletRequest request){
        String EmailFromToken = jwtTokenizer.getEmailWithToken(request);
        
        Order order = orderMapper.postInfoToOrder(postInfo);
        
        OrderDto.OrderReadyResponse readyForPay = orderService.startKakaoPay(order, EmailFromToken);
        
        return new ResponseEntity(
                new SingleResponseDto<>(readyForPay), HttpStatus.OK);
    }

    /**
     * 
     * @param pg_token 카톡에서 결제요청이 다 승인된 뒤에 받아오는 값
     * @param tid 처음 결제요청에서 거래에대한 암호키
     * @return
     */
    @GetMapping("/kakaopay/success")
    public ResponseEntity afterQR(@RequestParam("pg_token") String pg_token, @RequestParam("tid") String tid) {

        OrderDto.ApproveResponse approveResponse = orderService.approveKakaoPay(pg_token, tid);
        log.info("결제 승인 응답결과 = {}", approveResponse);

        return new ResponseEntity<>(
                new SingleResponseDto<>(approveResponse), HttpStatus.CREATED);
    }

    /**
     * 결제 취소시 실행 url (결제 QR코드에서 취소한 경우)
     */
    @GetMapping("/cancel")
    public String payCancel() {
        return "cancel order";
    }

    /**
     * 결제 실패시 실행 url (결제 QR코드에서 실패한 경우)
     */
    @GetMapping("/fail")
    public String payFail() {
        return "order failed";
    }


    /*
     * 마이페이지 결제한내역 리스트 조회
     */
    @GetMapping("/list")
    public ResponseEntity getOrderlistByUserId(HttpServletRequest request) {
        double totalAmount = 0;
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        List<Order> orderList = orderService.getOrderList(emailWithToken);
        List<OrderDto.PersonalOrder> personalOrders = orderMapper.getOrderList(orderList);

        for (int i = 0; i < orderList.size(); i++) {
            totalAmount += orderList.get(i).getTotalAmount();
        }

        return new ResponseEntity<>(
                new AmountResponseDto<>(personalOrders, totalAmount), HttpStatus.OK);
    }

    //TODO: 결제 취소리스트 구현
    //TODO: 환급로직 구현

}
