import styled from 'styled-components';

export const MainContainer = styled.footer`
  width: 100%;
`;

export const FirstPage = styled.div`
  height: 70%;
  color: #ffffff;
`;

export const FontSize50 = styled.div`
  font-size: 50px;
`;

export const FifthPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MarginTop = styled.div`
  margin-top: 10%;
  width: 1024px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Container = styled.div`
  width: 1024px;
  height: 100vh;
  margin-top: 20%;
`;

export const FontSize30 = styled.div`
  font-size: 30px;
`;

export const TitleWrapper = styled.div`
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  & > .title {
    margin-right: auto;
    font-size: 30px;
  }
  & > .view_all {
    font-size: 15px;
    cursor: pointer;
  }
`;

export const PopularChallengeWrapper = styled.div`
  width: 35%;
  margin-right: auto;
`;

export const PopularChallenge = styled.img`
  width: 230px;
  height: 230px;
`;

export const UserRankingWrapper = styled.div`
  width: 63%;
`;

export const UserRanking = styled.div`
  display: flex;
  /* justify-content: space-between; */
  padding: 1% 5%;
  border-bottom: 1px solid #f2f4fe;
`;

export const Members = styled.div`
  background-color: #f2f4fe;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 1% 5%;
`;
