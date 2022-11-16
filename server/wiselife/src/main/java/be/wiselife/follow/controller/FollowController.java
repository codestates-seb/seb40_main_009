package be.wiselife.follow.controller;

import be.wiselife.follow.service.FollowService;
import be.wiselife.member.service.MemberService;
import be.wiselife.security.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/follow")
@Valid
public class FollowController {
    private final FollowService followService;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    /**
     *
     * @param followingName 팔로워가 누를 대상
     * @param request 팔로워를 누른 사람
     */
    @PostMapping("/like/{followingName}")
    public void plusFollower(@PathVariable("followingName") String followingName,
                             HttpServletRequest request) {
        String followerEmail = jwtTokenizer.getEmailWithToken(request);

        followService.updateFollow(
                memberService.findMemberByEmail(followerEmail),
                memberService.findMemberByMemberName(followingName));
    }
}
