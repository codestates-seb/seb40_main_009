package be.wiselife.follow.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follow.entity.Follow;
import be.wiselife.follow.repository.FollowRepository;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = false)
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    /**
     * 팔로워를 누르게 되면, Member 상세페이지에서 followerCount가 증가하며
     * 나를 팔로워한 사람을 setFollower에 넣어둔다.
     */
    public void updateFollow(Member follower, Member following) {

        if (following.getMemberId() == follower.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_FOLLOW_YOURSELF);
        }

        //팔로잉하는 사람과 팔로워가 일치할때, 그때, isFollow가 false이면 추가해준다.
        Follow findFollow = isNotAlreadyFollow(follower.getMemberId(), following);
        //-------------------위로 문제 없음
        if (findFollow ==null) {
            Follow follow = followRepository.save(new Follow(follower.getMemberId(), following));
            follow.setFollow(true);
            follow.setFollowerName(follower.getMemberName());
            int followerCount = following.getFollowerCount() + 1;

            saveUpdateFollow(following, follow, followerCount);
        } else {
            if (findFollow.isFollow()) {
                findFollow.setFollow(false);
                findFollow.setFollowerName(follower.getMemberName());
                int followerCount = following.getFollowerCount() - 1;

                saveUpdateFollow(following, findFollow, followerCount);
            } else {
                findFollow.setFollow(true);
                findFollow.setFollowerName(follower.getMemberName());
                int followerCount = following.getFollowerCount() + 1;

                saveUpdateFollow(following, findFollow, followerCount);
            }
        }
    }

    private void saveUpdateFollow(Member following, Follow follow, int followerCount) {

        Set<Follow> follows = following.getFollows();
        follows.add(follow);
        following.setFollows(follows);
        following.setFollowerCount(followerCount);
        log.info("followers = {}", following.getFollows().size());
        memberRepository.save(following);
    }

    //팔로잉하는 사람과 팔로워가 있는지 파악 후 팔로잉하는 사람과 팔로워가 일치할때, 그때, isFollow가 무엇인지 반환한다.
    private Follow isNotAlreadyFollow(Long followerId, Member following) {
        return followRepository.findByFollowerIdAndFollowing(followerId, following); // user와, question으로 검색되는 vote가 없다면 true
    }
}
