package be.wiselife.order.controller;


import be.wiselife.member.service.MemberService;
import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import be.wiselife.order.mapper.OrderMapper;
import be.wiselife.order.service.OrderService;
import be.wiselife.security.JwtTokenizer;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/order")
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;
    private final JwtTokenizer jwtTokenizer;

    //결제준비 , 결제고유번호를 받기 위한 메소드
    @GetMapping("/ready")
    public @ResponseBody ResponseEntity startContract(@RequestBody OrderDto.OrderPostinfo postinfo, HttpServletRequest request) throws IOException { //나중에 order값 받아올 필요있음
        String EmailFromToken = jwtTokenizer.getEmailWithToken(request); // 토큰값으로부터 이메일정보를 가져온다.

        Order order = orderMapper.postInfoToOrder(postinfo); //주문 객체 생성

        OrderDto.OrderReadyResponse readyForPay = orderService.startKakaoPay(order, EmailFromToken);  //결제요청을 위한 서비스 실행

        return new ResponseEntity(readyForPay, HttpStatus.ACCEPTED);
    }

    //QR코드 이후의 결제 승인이 왔을때 수행되는 로직
    @GetMapping("/success")
    public ResponseEntity afterQR(@RequestParam String pg_token, HttpServletRequest request) {
        String EmailFromToken = jwtTokenizer.getEmailWithToken(request); // 토큰값으로부터 이메일정보를 가져온다.

        OrderDto.ApproveResponse approveResponse = orderService.approveKakaoPay(pg_token, EmailFromToken);
        log.info("결제 승인 응답결과 = {}", approveResponse);

        return new ResponseEntity<>(approveResponse, HttpStatus.CREATED);
    }

    // 결제 취소시 실행 url (결제 QR코드에서 취소한 경우)
    @GetMapping("/cancel")
    public String payCancel() {
        return "redirect:/";
    }

    // 결제 실패시 실행 url
    @GetMapping("/fail")
    public String payFail() {
        return "redirect:/";
    }


    //마이페이지 결제한내역 리스트 조회
    @GetMapping("/{userId}")
    public ResponseEntity getOrderlistByUserId(@PathVariable("userId") Long userId) {
        Page<Order> orderList = orderService.getOrderList(userId);

        return new ResponseEntity(orderList, HttpStatus.OK); //수정필요
    }

    //결제 취소리스트 구현 필요할까? v2

}
