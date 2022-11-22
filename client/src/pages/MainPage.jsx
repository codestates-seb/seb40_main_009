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
  Flex,
  TitleWrapper,
  MemberOfTheMonth,
  MarginLeft,
  Members,
} from '../style/Main/MainPageStyle';

import ChallengeList from '../components/ChallengeList/Challenge';
import SlideBanner from '../components/Main/SlideBanner';
import Loading from '../components/Loading/Loading';

import smile from '../image/smile.jpg';

export default function MainPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);

  // 유저조회(등급순)
  const getMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/member?page=1&size=9&sort=memberBadge`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;
      console.log(members);
      setMembers(members);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  //유저조회 axios 실행
  useEffect(() => {
    getMembers();
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
                  <div>
                    <ChallengeList />
                  </div>
                </div>
              </Container>
            </Animator>

            <Animator animation={batch(Fade(), MoveIn(1000, 0))}>
              <Container>
                <Flex>
                  <div>
                    <TitleWrapper>이달의 랭커</TitleWrapper>
                    <div>
                      <MemberOfTheMonth src={smile} alt="이번달 1등 유저사진" />
                    </div>
                  </div>
                  <MarginLeft>
                    <TitleWrapper>
                      <div className="wrapper">
                        <div className="title">전체 랭킹</div>
                        <div
                          className="view_all"
                          onClick={navigateChallengePage}
                        >
                          더보기
                        </div>
                      </div>
                    </TitleWrapper>
                    {members.map((user) => (
                      <Members key={user.memberId}>
                        <div>{user.memberName}</div>
                        <div>{user.memberBadge}</div>
                        <div>{user.followerCount}</div>
                      </Members>
                    ))}
                  </MarginLeft>
                </Flex>
              </Container>
            </Animator>
          </MarginTop>
        </ScrollPage>
      </ScrollContainer>
    </MainContainer>
  );
}
