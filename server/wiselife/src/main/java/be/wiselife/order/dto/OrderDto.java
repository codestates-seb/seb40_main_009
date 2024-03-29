package be.wiselife.order.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class OrderDto {


    @Getter
    @ToString
    public static class getTid{
        private String tid;
    }

    /**
     * 결재요청시 받는 조건
     */
    @Getter
    @Setter
    @ToString
    public static class OrderReadyResponse {

        private String tid;
        private String next_redirect_pc_url;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private String created_at;
    }


    /**
     * 결재승인요청할 때
     */
    @Getter
    @Setter
    @ToString
    public static class ApproveResponse {
        private String aid;
        private String tid;
        private String cid;
        private String sid;
        private String partner_order_id;
        private String partner_user_id;
        private String payment_method_type;
        private String item_name;
        private String item_code;
        private int quantity;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private String created_at;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private String approved_at;
        private String payload;
        private Amount amount;
        private double memberMoney;

    }

    @Getter
    @Setter
    @ToString
    public static class Amount {

        private int total;
        private int tax_free;
        private int tax;
        private int point;
        private int discount;
        private int green_deposit;
    }

    @Getter
    @Setter
    public static class OrderPostinfo{
        private String itemName;
        private double totalAmount;
        private int quantity;
        private int orderTax;
        private boolean orderSuccess = false;

    }
    @Getter
    @Setter
    @Builder
    public static class PersonalOrder {
        private Long orderId;
        private String approved_at;
        private String requestuniquenumber;
        private String itemName;
        private int totalAmount;
    }
}
