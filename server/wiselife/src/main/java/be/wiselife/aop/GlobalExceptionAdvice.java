package be.wiselife.aop;

import be.wiselife.dto.ErrorResponse;
import be.wiselife.dto.ErrorResponseDto;
import be.wiselife.exception.BusinessLogicException;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.io.IOException;

/*
 *  예외처리할떄 try-catch를 일일히 사용하기 귀찮고 가독성이 떨어져서 추가
 * @RESTcontrollerAdvice
 * @ExceptionHandler, @ModelAttribute, @InitBinder가 적용된 메서드들에 찾아 AOP를 적용해서 Controller 단에 적용한 @.
 *  필요할떄마다 추가해서 반환하는 방식으로 사용하면 좋을꺼같습니다.
 */

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    /**
     * businesslogicException은 논리적 에러처리 하는 메서드
     * 예시
     *    "error": {
     *         "status": 404,
     *         "message": "Question not exists",
     *         "fieldErrors": null,
     *         "violationErrors": null
     *     }
     */
    @ExceptionHandler
    public ResponseEntity BusinessHandler(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity(
                new ErrorResponseDto<>(response), HttpStatus.valueOf(e.getExceptionCode().getCode()));
    }

    /*
     * MethodArgumentNotValidException @validation으로 에러가 났을때 처리하는 함수
     * 프론트단에서 에러를 처리하므로 JSON 메시지를 다시 리백해줘야하는지?
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }
    /*
     * ConstraintViolationException jpa 제약조건 위반시 발생하는 에러 구현
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e) {
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response;
    }
    /*
     * HttpRequestMethodNotSupportedException 지원하지않는 API 호출에 대해서 에러 날리는 경우
     * POST만 받는 URI에 GET을 보냈다던지 etc
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

    /**
     * HttpMessageNotReadableException //body에 JSON을 안보내고 TEXT로 보낸경우
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "Required request body is missing");

        return response;
    }

    /**
     * MissingServletRequestParameterException //필수 파라미터 없을때 생기는 예외
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                e.getMessage());

        return response;
    }

    /*
     * 위에 에러를 다 지나 추가적으로 발생되는 에러를 핸들링하는 메서드
     * 디스코드에 보내는걸로...?
     * */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse etcException(Exception e) throws IOException {
        log.error("# ETC Error ", e);
        //실시간 관제가 어렵다, 실시간 관제할 서버같은 역할을 할 디스코드 webhook으로 보내기
        DiscordWebhook webhook = new DiscordWebhook();
        webhook.setTts(true);
        webhook.setContent(e.getMessage());
        webhook.execute();

        final ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
        return response;
    }

    /**
     * 프론트에서 요청한 사항:
     * token이 만기됐을때 웹훅이 아닌 바디로 나갈수도있도록 구현 필요
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse JwtTokenExcepiton(ExpiredJwtException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.UNAUTHORIZED, "Jwt expired");
        return response;
    }

    /**
     * 파일용량이 5mb이상일 경우
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse dataExpiredException(SizeLimitExceededException e) {
        final ErrorResponse response = ErrorResponse.of(HttpStatus.NOT_ACCEPTABLE, "File is too big less than 3MB");
        return response;
    }
}

