package be.wiselife.exception;

import lombok.Getter;

public enum ExceptionCode {
    UNAUTHORIZED_USER(403, "not authorized user"),
    USER_NOT_FOUND(404, "User not found"),
    USER_EXISTS(409, "User exists"),
    CHALLENGE_NOT_FOUND(404, "Challenge not found"),
    COMMENT_NOT_FOUND(404, "Comment not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }


}
