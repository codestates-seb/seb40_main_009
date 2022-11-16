import React from 'react';
import * as S from '../../style/Common/MainPageStyle';
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

function MainPage() {
  return (
    <S.MainContainer>
      <ScrollContainer snap="proximity">
        {/* 첫번째 페이지 */}
        <ScrollPage page={0}>
          <S.FirstPage>
            <Animator
              animation={batch(Sticky(37, 40), Fade(), MoveOut(0, -1000))}
            >
              <S.FirstPageText>
                행복한 삶을 살고 싶다면
                <br />
                목표에 의지하라.
              </S.FirstPageText>

              <S.FirstPageText2>
                <br />
                <br />
                혼자하기 힘든 일도 슬기로운 생활과 함께라면
              </S.FirstPageText2>

              <S.FirstPageImg src="img/banner.png" alt="시간이미지" />
            </Animator>
          </S.FirstPage>
        </ScrollPage>

        {/* 두번째  페이지 */}
        <ScrollPage page={2}>
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

        {/* 세번째  페이지 */}
        <ScrollPage page={5}>
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
        </ScrollPage>

        <S.Container></S.Container>
      </ScrollContainer>
    </S.MainContainer>
  );
}

export default MainPage;
