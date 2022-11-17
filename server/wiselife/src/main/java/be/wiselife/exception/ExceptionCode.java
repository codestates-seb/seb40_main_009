package be.wiselife.exception;

import lombok.Getter;

public enum ExceptionCode {

    /*
     * 필요시 추가로 구현하시면 됩니다 에러이름(code, message)
     */
    //Member 부분 예외 ==============시작
    MEMBER_NOT_FOUND(404, "Member not exists"),
    MEMBER_NAME_ALREADY_EXISTS(400, "This memberName already exists"),
    NO_MORE_HIGH_GRADE(400,"Your Badge Highest Badge"),
    CAN_NOT_UPDATE_USER_INFORMATION_OTHER_PERSON(404, "Can't Update User Information Other Person"), //이름 맴버로 (유현)
    USER_EXISTS(409, "User exists"), //이름을 MEMBER로 바꾸기 (유현)

    //Challenge 부분 예외 ==============시작
    CHALLENGE_NOT_FOUND(404, "Challenge not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    CHALLENGE_CATEGORY_NOT_FOUND(404, "Category not found"),
    
    //Follower 부분 예외 ==========시작
    CAN_NOT_FOLLOW_YOURSELF(404, "Can not follow yourself"),
   
   //login 부분 예외 ========시작
    SIGNUP_WRONG(404,"somethings get wrong during login" ),
    //order 부분 예외 ========시작
    TRADE_CODE_WRONG(404,"Not available tid" ),
    NO_ORDER_RESOPNSE(404,"Order Response was null" ),
    TOTAL_AMOUNT_DIFFERENT(404,"Total amount is different Please check the approveKakaoPay Method in orderservice" );


    @Getter
    private int code;
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {

        this.code = code;
        this.message = message;
    }
}
