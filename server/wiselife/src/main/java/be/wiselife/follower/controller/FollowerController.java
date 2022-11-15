package be.wiselife.follower.controller;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follower.service.FollowerService;
import be.wiselife.member.entity.Member;
import be.wiselife.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/follower")
@Valid
public class FollowerController {
    private final FollowerService followerService;
    private final MemberService memberService;

    /**
     *
     * @param followingMemberId 팔로워가 누를 대상
     * @param followerMemberId 팔로워를 누른 사람 -> 로그인 기능 후 부터는 파라미터 전달하지 않을 예
     */
    @PostMapping("/like")
    public void plusFollower(@Positive @RequestParam("followingMemberId") Long followingMemberId,
                                 @Positive @RequestParam("followerMemberId") Long followerMemberId
                                 ) {
        followerService.updateFollower(followingMemberId, followerMemberId);
    }
}
