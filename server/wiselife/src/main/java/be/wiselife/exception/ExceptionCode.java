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
    CAN_NOT_UPDATE_USER_INFORMATION_OTHER_PERSON(404, "Can't Update User Information Other Person"),

    YOU_NEED_TO_LOGIN(404,"You must to login for access this data"),

    //아래부분 영운님이 어디서썻는지 파악후 네임 변경 필요
    UNAUTHORIZED_USER(403, "not authorized user"),
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),


    //Challenge 부분 예외 ===========시작
    CHALLENGE_NOT_FOUND(404, "Challenge not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    
    //Follower 부분 예외 ==========시작
    CAN_NOT_FOLLOW_YOURSELF(404, "Can not follow yourself"),
   
   //login 부분 예외 ========시작
    SIGNUP_WRONG(404,"somethings get wrong during login" ),
    TRADE_CODE_WRONG(404,"Not available tid" );

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
