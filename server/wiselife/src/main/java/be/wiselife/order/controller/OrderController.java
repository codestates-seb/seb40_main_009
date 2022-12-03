package be.wiselife.order.controller;

import be.wiselife.aop.NeedEmail;

import be.wiselife.aop.NeedMember;
import be.wiselife.challenge.dto.ChallengeDto;
import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.mapper.ChallengeMapper;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.challengereview.mapper.ChallengeReviewMapper;
import be.wiselife.dto.AmountResponseDto;
import be.wiselife.dto.MultiResponseDto;
import be.wiselife.dto.SingleResponseDto;
import be.wiselife.member.entity.Member;
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
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/order")
@Slf4j
@RequiredArgsConstructor
@SessionAttributes("tid")
public class OrderController {

    private final OrderService orderService;
    private final ChallengeService challengeService;
    private final OrderMapper orderMapper;
    private final ChallengeReviewMapper challengeReviewMapper;
    private final ChallengeMapper challengeMapper;
    private final JwtTokenizer jwtTokenizer;

    /**
     *
     * @param postInfo : 카카오톡 측에서 요구하는 상품명, 금액, 수량, tax 그리고 거래완료여부를 보기위한 boolean이있다.
     * @param email :
     * @return
     * @throws IOException
     */
    @NeedEmail
    @PostMapping("/ready")
    public @ResponseBody ResponseEntity startContract(String email, @RequestBody OrderDto.OrderPostinfo postInfo){

        Order order = orderMapper.postInfoToOrder(postInfo);
        
        OrderDto.OrderReadyResponse readyForPay = orderService.startKakaoPay(order, email);
        return new ResponseEntity(
                new SingleResponseDto<>(readyForPay), HttpStatus.OK);
    }

    /**
     *
     * @param pg_token 챌린지 생성시 카톡에서 결제요청이 다 승인된 뒤에 받아오는 값
     * @param tid 처음 결제요청에서 거래에대한 암호키
     * @return
     */

    @GetMapping(value = "/kakaopay/success")
    public ResponseEntity afterQR(@RequestParam("pg_token") String pg_token,
                                  @RequestParam("tid") String tid) throws IOException {

        OrderDto.ApproveResponse approveResponse = orderService.approveKakaoPay(pg_token, tid);

        return new ResponseEntity<>(
                new SingleResponseDto<>(approveResponse), HttpStatus.CREATED);
    }
   
//    /**
//     *
//     * @param pg_token 챌린지 참가시 카톡에서 결제요청이 다 승인된 뒤에 받아오는 값, 프론트에서는 참가자가 챌린지 진입시, 탈퇴만 보이게 해야함
//     * @param tid 처음 결제요청에서 거래에대한 암호키
//     * @return
//     */
//    @NeedMember
//    @GetMapping(value = "/kakaopay/success/{challengeId}")
//    public ResponseEntity afterParticipateQR(Member member,
//                                  @PathVariable("challengeId") Long challengeId,
//                                  @RequestParam("pg_token") String pg_token,
//                                  @RequestParam("tid") String tid) throws IOException {
//            log.info("participate");
//            Challenge challengeFromRepository = challengeService.findChallengeById(challengeId);
//            challengeFromRepository = orderService.approveKakaoPay(pg_token,tid,challengeFromRepository, member);
//            return new ResponseEntity<>(
//                    new SingleResponseDto<>(challengeMapper.challengeToChallengeSimpleResponseDto(challengeFromRepository, challengeReviewMapper))
//                    , HttpStatus.CREATED);
//    }
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
    @NeedEmail
    @GetMapping("/list")
    public ResponseEntity getOrderlistByUserId(String email) {
        double totalAmount = 0;
        List<Order> orderList = orderService.getOrderList(email);
        List<OrderDto.PersonalOrder> personalOrders = orderMapper.getOrderList(orderList);

        for (int i = 0; i < orderList.size(); i++) {
            totalAmount += orderList.get(i).getTotalAmount();
        }

        return new ResponseEntity<>(
                new AmountResponseDto<>(personalOrders, totalAmount), HttpStatus.OK);
    }
}
