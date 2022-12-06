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
  ZoomInScrollOut,
  FadeUp,
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

  const Spin = (cycle) => ({
    in: {
      style: {
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
  });

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <span style={{ fontSize: '40px' }}>
              <Animator animation={MoveIn(-1000, 0)}>지금 바로</Animator>
              <Animator animation={MoveIn(1000, 0)}>
                슬기로운 생활과 함께
              </Animator>
              목표를 향해
              <Animator animation={MoveOut(1000, 0)}>건강하게 </Animator>
              <Animator animation={MoveOut(-1000, 0)}>앞서 나아가다</Animator>
            </span>
          </div>
        </ScrollPage>

        {/* 신규챌린지 */}
        <ScrollPage page={6}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <div>
              <Animator animation={MoveIn(-1000, 0)}>
                <span style={{ fontSize: '30px' }}>
                  ✨지금 바로 챌린지에 도전해보세요✨
                </span>
              </Animator>
              <Animator animation={MoveIn(1000, 0)}>
                <div style={{ marginTop: '5%' }}>
                  <div style={{ fontSize: '25px' }}>신규챌린지</div>
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
                        challengeRepImagePath,
                      }) => (
                        <Challenge
                          key={challengeId}
                          id={challengeId}
                          title={challengeTitle}
                          description={challengeDescription}
                          image={challengeRepImagePath}
                        />
                      )
                    )}
                  </div>
                </div>
              </Animator>
            </div>
          </div>
        </ScrollPage>

        <ScrollPage page={7}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              // width: '1024px',
              // border: '1px solid blue',
            }}
          >
            <Container>
              {/* 인기 챌린지 */}
              {/* 3개 순환하는거 만들기 */}
              <div
                style={{
                  // border: '1px solid orange',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Animator animation={Spin(10)}>
                  <div>
                    <TitleWrapper>
                      <div className="title">✨슬기로운 생활의 1등 유저✨</div>
                    </TitleWrapper>
                    <div
                      style={{
                        // border: '1px solid red',
                        justifyContent: 'center',
                        display: 'flex',
                      }}
                    >
                      <PopularChallenge
                        src={members[0]?.memberImagePath}
                        alt="인기 챌린지"
                      />
                    </div>
                  </div>
                </Animator>
              </div>

              {/* 유저 랭킹 */}
              <Animator animation={MoveIn(1000, 0)}>
                <div
                  style={{
                    // border: '1px solid orange',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2%',
                  }}
                >
                  <UserRankingWrapper>
                    <TitleWrapper>
                      <div className="title">유저 랭킹</div>
                      <div className="view_all" onClick={navigateChallengePage}>
                        더보기
                      </div>
                    </TitleWrapper>
                    <Members>
                      <div>순위</div>
                      <div>유저이름</div>
                      <div>레벨</div>
                      <div>팔로워수</div>
                    </Members>
                    {members.map((user, index) => (
                      <UserRanking key={user.memberId}>
                        <div>{index + 1}</div>
                        <div>{user.memberName}</div>
                        <div>{user.memberBadge}</div>
                        <div>{user.followerCount}</div>
                      </UserRanking>
                    ))}
                  </UserRankingWrapper>
                </div>
              </Animator>
            </Container>
          </div>
        </ScrollPage>
      </ScrollContainer>
    </MainContainer>
  );
}
