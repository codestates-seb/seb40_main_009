package be.wiselife.order.controller;


import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import be.wiselife.order.mapper.OrderMapper;
import be.wiselife.order.service.OrderService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;

@RestController
@RequestMapping("/order")
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    private String tid; //결제고유번호
    private final OrderService orderService;
    private final OrderMapper orderMapper;

    //결제준비 , 결제고유번호를 받기 위한 메소드
    @GetMapping("/ready")
    public @ResponseBody ResponseEntity startContract(@RequestBody OrderDto.OrderPostinfo postinfo) throws IOException { //나중에 order값 받아올 필요있음
        log.info("주문정보 ={}", postinfo.getItemName()); log.info("결재 총액 ={}", postinfo.getTotalAmount());

        Order order = orderMapper.postInfoToOrder(postinfo);
        OrderDto.OrderReadyResponse readyForPay = orderService.startKakaoPay(order);  //결제요청을 위한 서비스 실행
        orderService.saveTid(order,readyForPay.getTid()); // 거래고유번호 저장

        this.tid = readyForPay.getTid(); //로그인 기능시 삭제예정
        return new ResponseEntity(readyForPay, HttpStatus.ACCEPTED);
    }

    //QR코드 이후의 결제 승인
    @GetMapping("/success")
    public ResponseEntity afterQR(@RequestParam String pg_token) {
        OrderDto.ApproveResponse approveResponse = orderService.approveKakaoPay(pg_token, tid);
        log.info("결제 승인 응답결과 = {}", approveResponse);

        return new ResponseEntity<>(approveResponse, HttpStatus.CREATED);
    }

    // 결제 취소시 실행 url
    @GetMapping("/cancel")
    public String payCancel() {
        return "redirect:/";
    }

    // 결제 실패시 실행 url
    @GetMapping("/fail")
    public String payFail() {
        return "redirect:/";
    }


}
