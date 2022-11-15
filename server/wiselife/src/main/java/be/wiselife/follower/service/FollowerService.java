package be.wiselife.follower.service;

import be.wiselife.exception.BusinessLogicException;
import be.wiselife.exception.ExceptionCode;
import be.wiselife.follower.entity.Follower;
import be.wiselife.follower.repository.FollowerRepository;
import be.wiselife.member.entity.Member;
import be.wiselife.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class FollowerService {

    private final FollowerRepository followerRepository;
    private final MemberRepository memberRepository;

    /**
     * 팔로워를 누르게 되면, Member 상세페이지에서 followerCount가 증가하며
     * 나를 팔로워한 사람을 setFollower에 넣어둔다.
     */
    public void updateFollower(Long followingMemberId, Long followerMemberId) {
        Member followingMember = memberRepository.findById(followingMemberId).orElseThrow();
        Member followerMember = memberRepository.findById(followerMemberId).orElseThrow();

        if (followingMember.getMemberId() == followerMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_FOLLOW_YOURSELF);
        }

        //팔로잉하는 사람과 팔로워가 일치할때, 그때, isFollow가 false이면 추가해준다.
        Follower findFollower = isNotAlreadyFollower(followerMember.getMemberId(), followingMember);
        //-------------------위로 문제 없음
        if (findFollower==null) {
            Follower follower = followerRepository.save(new Follower(followerMember.getMemberId(), followingMember));
            follower.setFollow(true);
            follower.setFollowerName(followerMember.getMemberName());
            int followerCount = followingMember.getFollowerCount() + 1;

            saveUpdateFollower(followingMember, follower, followerCount);
        } else {
            if (findFollower.isFollow()) {
                findFollower.setFollow(false);
                findFollower.setFollowerName(followerMember.getMemberName());
                int followerCount = followingMember.getFollowerCount() - 1;

                saveUpdateFollower(followingMember, findFollower, followerCount);
            } else {
                findFollower.setFollow(true);
                findFollower.setFollowerName(followerMember.getMemberName());
                int followerCount = followingMember.getFollowerCount() + 1;

                saveUpdateFollower(followingMember, findFollower, followerCount);
            }
        }
    }

    private void saveUpdateFollower(Member followingMember, Follower follower, int followerCount) {

        Set<Follower> followers = followingMember.getFollowers();
        followers.add(follower);
        followingMember.setFollowers(followers);
        followingMember.setFollowerCount(followerCount);
        log.info("followers = {}", followingMember.getFollowers().size());
        memberRepository.save(followingMember);
    }

    //팔로잉하는 사람과 팔로워가 있는지 파악 후 팔로잉하는 사람과 팔로워가 일치할때, 그때, isFollow가 무엇인지 반환한다.
    private Follower isNotAlreadyFollower(Long followerMemberId, Member followingMember) {
        return followerRepository.findByFollowerMemberIdAndFollowingMember(followerMemberId, followingMember); // user와, question으로 검색되는 vote가 없다면 true
    }
}
