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
    //Member 부분 예외 ==============끝

    //Challenge 부분 예외 ==============시작
    CHALLENGE_NOT_FOUND(404, "Challenge not found"),
    COMMENT_NOT_FOUND(404, "Comment not found");
    //Challenge 부분 예외 ==============끝
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
