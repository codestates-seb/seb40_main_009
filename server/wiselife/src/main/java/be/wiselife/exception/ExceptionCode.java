package be.wiselife.exception;

import lombok.Getter;

public enum ExceptionCode {

    /*
     * 필요시 추가로 구현하시면 됩니다 에러이름(code, message)
     */
    //Member 부분 예외 ==============시작
    MEMBER_NOT_FOUND(404, "Member not exists"),
    MEMBER_NAME_ALREADY_EXISTS(400, "This memberName already exists"),
    CAN_NOT_UPDATE_MEMBER_INFORMATION_OTHER_PERSON(404, "Can't Update User Information Other Person"),

    //Challenge 부분 예외 ==============시작
    CHALLENGE_NOT_FOUND(404, "Challenge not found"),
    CHALLENGE_MAX_PARTY_CAN_NOT_SMALLER_THAN_MIN_PARTY(404, "Challenge max party can't smaller than min party"),
    USER_NOT_PARTICIPATING_THIS_CHALLENGE(404, "Only users who have participated in the challenge can write reviews"),
    YOU_NEED_TO_CHARGE_MONEY(404, "You need to charge money"),
    THIS_CHALLENGE_HAS_MAX_MEMBER(404, "This challenge has max member"),
    YOU_ALREADY_UNPARTICIPATED(404, "You already unparticipated"),
    CHALLENGE_ALREADY_STARTED(404, "Challenge already started"),
    //Follower 부분 예외 ==========시작
    CAN_NOT_FOLLOW_YOURSELF(404, "Can not follow yourself"),
    YOU_ALREADY_FILL_CERT_NUMBER(404, "You already fill cert number"),
   
   //login 부분 예외 ========시작
    SIGNUP_WRONG(404,"somethings get wrong during login" ),
    FORBIDDEN_MEMBER(403, "The member does not have permission"),
    REFRESHTOKEN_EXPIRED(404, "Refresh Token also Expired, please login"),
    TOKEN_IS_NOT_VALIDED(404,"Token is not valided"),

    //order 부분 예외 ========시작
    TRADE_CODE_WRONG(404,"Not available tid" ),
    NO_ORDER_RESOPNSE(404,"Order Response was null" ),
    TOTAL_AMOUNT_DIFFERENT(404,"Total amount is different Please check the approveKakaoPay Method in orderservice" ),

    //ChallengeExamImage 부분 예외 ===========시작
    CHALLENGE_EXAM_IMAGE_MUST_ENROLL(404, "Challenge example image must be enroll min one-image"),

    //ChallengeCertImage 부분 예외 ===========시작
    NOT_CERTIFICATION_AVAILABLE_TIME(404, "Must upload certification photo at the appropriate time"),

    YOU_MUST_PARTICIPATE_TO_CHALLENGE_FIRST(404, "You must participate to challenge first"),

    //Challenge Talk 부분 예외 ==============시작
    CHALLENGE_TALK_NOT_FOUND(404, "ChallengeTalk not found"),

    //Challenge Review 부붕 예외 ==============시작
    CHALLENGE_REVIEW_NOT_FOUND(404, "ChallengeReview not found"),
    CHALLENGE_REVIEW_ALREADY_EXISTS(400, "ChallengeReview not found"),


    //권한이 없는 자의 예외 =============시작

    //이미지 업로드 관련 =============시작
    FILEUPLOAD_FAILED(404, "Failed uploading Image"),
    NEED_IMAGE(404, "Need Image to get permission" );
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
