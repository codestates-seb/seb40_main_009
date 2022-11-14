package be.wiselife.exception;

import lombok.Getter;

/*
 * 스프링에서 지원하지않는 예외들을 처리해주는 클래스... 예외처리가 필요할 시,
 * exceptioncode enum으로 이동해서 추가하면됩니다.
 */
public class BusinessLogicException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
