import React from 'react';
import * as S from '../../style/Main/MainPageStyle';
import ChallengeList from '../ChallengeList/Challenge';
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from 'react-scroll-motion';
import SlideBanner from './SlideBanner';

function MainPage() {
  return (
    <S.MainContainer>
      {/* 스크롤 시작 */}
      <ScrollContainer snap="none">
        {/* 첫번째 페이지 */}
        <ScrollPage page={0}>
          <S.FirstPage>
            {/* 슬라이드 */}
            <SlideBanner />
          </S.FirstPage>
        </ScrollPage>

        {/* 두번째  페이지 */}
        <ScrollPage page={1}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <S.FontSize50>같은 목표를 가진 사람들과 함께</S.FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={2}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <S.FontSize50>동기부여를 높이기 위해서 돈을 걸고</S.FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={3}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <S.FontSize50>목표 100% 달성 시</S.FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={4}>
          <Animator
            animation={batch(Sticky(50), Fade(), MoveOut(0, -200), ZoomIn())}
          >
            <S.FontSize50>쏠쏠한 상금까지</S.FontSize50>
          </Animator>
        </ScrollPage>

        <ScrollPage page={5}>
          <S.PageFive>
            <Animator animation={MoveIn(0, -1000)}>
              <S.FontSize50>지금 바로</S.FontSize50>
            </Animator>
            <Animator animation={MoveOut(0, 1600)}>
              <S.FontSize50>슬기로운 생활과 함께</S.FontSize50>
            </Animator>
            <Animator animation={MoveOut(2000, 1300)}>
              <S.FontSize50>목표를 향해</S.FontSize50>
            </Animator>
            <Animator animation={MoveOut(-2000, 1000)}>
              <S.FontSize50>건강하게 앞서 나아가다</S.FontSize50>
            </Animator>
          </S.PageFive>
        </ScrollPage>

        {/* 세번째  페이지 */}
        <ScrollPage page={6}>
          <S.Mt4>
            <Animator animation={batch(Fade(), MoveIn(-1000, 0))}>
              <S.Container>
                <div>
                  <S.FontSize30>신규챌린지</S.FontSize30>
                  <div>
                    <ChallengeList />
                  </div>
                </div>
              </S.Container>
            </Animator>

            <Animator animation={batch(Fade(), MoveIn(1000, 0))}>
              <S.Container>
                <S.Flex>
                  <div>
                    <S.FontSize30M3>이달의 랭커</S.FontSize30M3>
                    <div>
                      <S.MonthlyUser
                        src="./img/smile.jpg"
                        alt="이번달 1등 유저사진"
                      />
                    </div>
                  </div>
                  <S.MarginLeft3>
                    <S.FontSize30M3>전체 랭킹</S.FontSize30M3>
                    <S.AllUser>
                      <div>사진</div>
                      <div>닉네임</div>
                      <div>레벨</div>
                      <div>인기도</div>
                    </S.AllUser>
                  </S.MarginLeft3>
                </S.Flex>
              </S.Container>
            </Animator>
          </S.Mt4>
        </ScrollPage>
      </ScrollContainer>
    </S.MainContainer>
  );
}

export default MainPage;
