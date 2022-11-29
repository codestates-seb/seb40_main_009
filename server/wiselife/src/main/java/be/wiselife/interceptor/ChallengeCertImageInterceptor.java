package be.wiselife.interceptor;

import be.wiselife.challenge.service.ChallengeService;
import be.wiselife.image.repository.ImageRepository;
import be.wiselife.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class ChallengeCertImageInterceptor implements HandlerInterceptor {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ChallengeService challengeService;
    @Autowired
    private MemberService memberService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        LocalTime now = LocalTime.now();
//        String requestUri = request.getRequestURI();
//        Long challengeId = Long.parseLong(requestUri.substring(requestUri.lastIndexOf('/')+1));
//        System.out.println(challengeId + "!!!!!!!!!!!!!!!!!!!!!!!!!!");
//
//        Challenge challenge = challengeService.getChallengeById(challengeId);
//
//        Member loginMember = memberService.getLoginMember(request);
//        List<ChallengeCertImage> challengeCertImages =
//                imageRepository.findByImageTypeAndMemberIdAndChallengeCertIdCount("CCI",
//                        loginMember.getMemberId(), challenge.getRandomIdForImage());
//        List<String> challengeAuthAvailableTime = challenge.getChallengeAuthAvailableTime();
//
//        int todayAuthenticationsCnt = challengeCertImages.size();
//
//        LocalTime authAvailableTime = LocalTime.parse(challengeAuthAvailableTime.get(todayAuthenticationsCnt));
//
//        if(authAvailableTime.equals(now) || now.isAfter(authAvailableTime) && now.isBefore(authAvailableTime.plusMinutes(10)))
//            return true;
//        else
//            return false;
        return true;
    }
}
