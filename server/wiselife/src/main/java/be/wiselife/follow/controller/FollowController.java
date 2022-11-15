package be.wiselife.follow.controller;

import be.wiselife.follow.service.FollowService;
import be.wiselife.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/follow")
@Valid
public class FollowController {
    private final FollowService followService;

    /**
     *
     * @param followingId 팔로워가 누를 대상
     * @param followerId 팔로워를 누른 사람 -> 로그인 기능 후 부터는 파라미터 전달하지 않을 예
     */
    @PostMapping("/like")
    public void plusFollower(@Positive @RequestParam("followingId") Long followingId,
                                 @Positive @RequestParam("followerId") Long followerId
                                 ) {
        followService.updateFollow(followingId, followerId);
    }
}
