import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  MoveIn,
  MoveOut,
  Sticky,
  ZoomIn,
} from 'react-scroll-motion';

import {
  MainContainer,
  FirstPage,
  FontSize50,
  FifthPage,
  MarginTop,
  Container,
  FontSize30,
  TitleWrapper,
  PopularChallengeWrapper,
  PopularChallenge,
  UserRankingWrapper,
  UserRanking,
  Members,
} from '../style/Dashboard/DashboardPageStyle';

import Challenge from '../components/ChallengeList/Challenge';
import SlideBanner from '../components/Dashboard/SlideBanner';
import Loading from '../components/Loading/Loading';

import smile from '../image/smile.jpg';

export default function MainPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [challenges, setChallenges] = useState([]);

  // 유저조회(등급순)
  const getMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/member?page=1&size=10&sort=memberBadge`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const memberList = response.data.data;
      setMembers(memberList);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  //유저조회 axios 실행
  useEffect(() => {
    getMembers();
  }, []);

  // 챌린지조회(최신순)
  const getChallenge = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/challenges/all/2?sort-by=newest&page=1&size=3`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const challengeList = response.data.data;
      setChallenges(challengeList);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  //챌린지조회 axios 실행
  useEffect(() => {
    getChallenge();
  }, []);

  // 챌린지 리스트로 이동
  const navigateChallengePage = () => {
    navigate('/challengelist');
  };

  //early return pattern
  if (loading) return <Loading />;

  return (
    <MainContainer>
      {/* 스크롤 시작 */}
      <ScrollContainer snap="none">
        {/* 슬라이드 */}
        <ScrollPage page={0}>
          <FirstPage>
            <SlideBanner />
          </FirstPage>
        </ScrollPage>

        {/* 스크롤 시 글자 모션 */}
        <ScrollPage page={1}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <FontSize50>같은 목표를 가진 사람들과 함께</FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={2}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <FontSize50>동기부여를 높이기 위해서 돈을 걸고</FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={3}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <FontSize50>목표 100% 달성 시</FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={4}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <FontSize50>쏠쏠한 상금까지</FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={5}>
          <FifthPage>
            <Animator animation={MoveIn(0, -1000)}>
              <FontSize50>지금 바로</FontSize50>
            </Animator>
            <Animator animation={MoveOut(0, 1600)}>
              <FontSize50>슬기로운 생활과 함께</FontSize50>
            </Animator>
            <Animator animation={MoveOut(2000, 1400)}>
              <FontSize50>목표를 향해</FontSize50>
            </Animator>
            <Animator animation={MoveOut(-2000, 1200)}>
              <FontSize50>건강하게 앞서 나아가다</FontSize50>
            </Animator>
          </FifthPage>
        </ScrollPage>

        {/* 신규챌린지, 이달의 랭커, 전체 랭킹 */}
        <ScrollPage page={6}>
          <MarginTop>
            <Animator animation={batch(Fade(), MoveIn(-1000, 0))}>
              <Container>
                <div>
                  <FontSize30>신규챌린지</FontSize30>
                  <div
                    style={{
                      border: '2px solid #eff1fe',
                      marginTop: '3%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      width: '100%',
                    }}
                  ></div>
                  <div
                    style={{
                      display: 'flex',
                      width: '1024px',
                      justifyContent: 'space-between',
                    }}
                  >
                    {challenges.map(
                      ({
                        challengeId,
                        challengeTitle,
                        challengeDescription,
                      }) => (
                        <Challenge
                          key={challengeId}
                          challengeId={challengeId}
                          challengeTitle={challengeTitle}
                          challengeDescription={challengeDescription}
                        />
                      )
                    )}
                  </div>
                </div>
              </Container>
            </Animator>

            <Animator animation={batch(Fade(), MoveIn(1000, 0))}>
              <Container>
                {/* 인기 챌린지 */}
                {/* 3개 순환하는거 만들기 */}
                <PopularChallengeWrapper>
                  <FontSize30>인기 챌린지</FontSize30>
                  <div>
                    <PopularChallenge src={smile} alt="인기 챌린지" />
                  </div>
                </PopularChallengeWrapper>
                {/* 유저 랭킹 */}
                <UserRankingWrapper>
                  <TitleWrapper>
                    <div className="title">유저 랭킹</div>
                    <div className="view_all" onClick={navigateChallengePage}>
                      더보기
                    </div>
                  </TitleWrapper>
                  <Members>
                    <div>유저이름</div>
                    <div>레벨</div>
                    <div>팔로워수</div>
                  </Members>
                  {members.map((user) => (
                    <UserRanking key={user.memberId}>
                      <div>{user.memberName}</div>
                      <div>{user.memberBadge}</div>
                      <div>{user.followerCount}</div>
                    </UserRanking>
                  ))}
                </UserRankingWrapper>
              </Container>
            </Animator>
          </MarginTop>
        </ScrollPage>
      </ScrollContainer>
    </MainContainer>
  );
}
