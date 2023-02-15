package be.wiselife.order.service;

import be.wiselife.challenge.entity.Challenge;
import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import be.wiselife.order.dto.OrderDto;
import be.wiselife.order.entity.Order;
import be.wiselife.order.repository.OrderRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = false)
public class OrderService {
    static final String cid = "TC0ONETIME"; //가맹점 테스트 코드
    @Getter
    @Value("${common.data.kakao}")
    private String authorization;

    String readyUrl = "https://kapi.kakao.com/v1/payment/ready";
    String approveUrl = "https://kapi.kakao.com/v1/payment/approve";
    @Getter
    @Value("${common.data.success}")
    private String successUrl;
    @Getter
    @Value("${common.data.cancel}")
    private String cancelUrl;
    @Getter
    @Value("${common.data.fail}")
    private String failUrl;

    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final ChallengeService challengeService;

    /**
     * @return 카톡측으로 결제번호, URL 수령
     */
    public OrderDto.OrderReadyResponse startKakaoPay(Order order, String emailFromToken) {

        log.info("startKakaoPay tx start");
        Member member = memberRepository.findByMemberEmail(emailFromToken).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        order.addMember(member);
        orderRepository.save(order); //ORDERID 값을 지정받기 위해 값을 저장하고 주문한 맴버를 저장한다.

        //카카오톡에서 요청하는 기본 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", String.valueOf(order.getOrderId())); // 주문번호
        parameters.add("partner_user_id", String.valueOf(member.getMemberId())); // 맴버아이디
        parameters.add("item_name", order.getItemName()); //상품명
        parameters.add("quantity", String.valueOf(order.getQuantity())); // 상품수량
        parameters.add("total_amount", String.valueOf((int)order.getTotalAmount())); //결재 총액
        parameters.add("vat_amount", String.valueOf(order.getOrderTax())); //상품 비과세 금액
        parameters.add("tax_free_amount", "0"); // 상품 부가세 금액
        parameters.add("approval_url", successUrl);
        parameters.add("cancel_url", cancelUrl);
        parameters.add("fail_url", failUrl);

        // 보낼 파라미터와 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에게 보낼 URL
        RestTemplate template = new RestTemplate();

        // 보낼 외부 url, 요청 메시지(header,parameter), 처리후 값을 받아올 클래스.
        OrderDto.OrderReadyResponse ready = template.postForObject(readyUrl, requestEntity, OrderDto.OrderReadyResponse.class);
        log.info("결제번호와 결제URL이 담긴 응답객체: " + ready);

        if (ready != null) { //결재번호를 저장하면서 맴버에도 해당 정보를 저장한다.
            order.setTid(ready.getTid());
            orderRepository.save(order);
            member.addOrder(order);
            memberRepository.save(member);
            log.info("결제번호와 결제링크를 발부 받음 그리고 해당데이터를 저장함.");
        }

        log.info("startKakaoPay tx end");
        return ready;
    }

    /**
     * 결제ID와 pgtoken값을 통해 결제 완료승인을 받는 메서드
     * @return 승인된 결제결과를 받는다.
     */

    public OrderDto.ApproveResponse approveKakaoPay(String pgtoken, String tid) throws IOException {
        log.info("approveKakaoPay tx start {}",tid);
        Order order = orderRepository.findByTid(tid).orElseThrow(()->new BusinessLogicException(ExceptionCode.TRADE_CODE_WRONG));

        //카카오톡에서 요청하는 기본 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", tid);
        parameters.add("partner_order_id", String.valueOf(order.getOrderId()));
        parameters.add("partner_user_id", String.valueOf(order.getMember().getMemberId()));
        parameters.add("pg_token", pgtoken);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
        RestTemplate restTemplate = new RestTemplate();
        OrderDto.ApproveResponse approveResponse = restTemplate.postForObject(approveUrl, requestEntity, OrderDto.ApproveResponse.class);

        if (approveResponse != null) {
            log.info("승인 및 결제완료 {}", approveResponse.getTid());
            int beforeTrade = (int) order.getTotalAmount();
            int afterTrade = approveResponse.getAmount().getTotal();
            if (beforeTrade != afterTrade) { //결제요청전 금액과 결제요청 금액이 다르다면 예외를 반환한다.
                throw new BusinessLogicException(ExceptionCode.TOTAL_AMOUNT_DIFFERENT);
            }
            order.setApproved_at(approveResponse.getApproved_at()); //결제인증시간 저장
            order.setRequestuniquenumber(approveResponse.getAid()); //요청고유번호 저장
            order.setOrderSuccess(Boolean.TRUE);
            orderRepository.save(order);
            double chargedMoney = updateMemberMoney(order);
            log.info("approveKakaoPay tx end");
            approveResponse.setMemberMoney(chargedMoney);
            return approveResponse;

        } else {//거래가 이상하다면 approveResponse가 안온걸로 반환.
            log.info("approveKakaoPay tx end");
            throw new BusinessLogicException(ExceptionCode.NO_ORDER_RESOPNSE);
        }

    }
    private double updateMemberMoney(Order order) {
        log.info("updateMemberMoney tx start");
        Member member = order.getMember();
        double memberMoney=member.getMemberMoney();
        memberMoney+= order.getTotalAmount();
        member.setMemberMoney(memberMoney);
        memberRepository.save(member);
        log.info("updateMemberMoney tx end");
        return memberMoney;
    }

    /**
     * 이메일을 통해서 맴버를 찾고
     * @return  맴버아이디와 일치되는 오더기록을 리턴한다.
     */

    public List<Order> getOrderList(String email) {
        log.info("getOrderList tx start");
        Member member = memberRepository.findByMemberEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<Order> orders = orderRepository.findByMemberId(member); //쿼리dsl 통해서 얻어낸 order들.
        log.info("getOrderList tx end");
        return orders;
    }

    /**
     * @return 카톡측에서 요구하는 헤더값 리턴
     */

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorization);
        headers.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return headers;
    }
}
