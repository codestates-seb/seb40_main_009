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

export const Container = styled.div`
  width: 1024px;
  height: 100vh;
  margin-top: 20%;
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

export const PopularChallenge = styled.img`
  width: 230px;
  height: 230px;
`;

export const UserRankingWrapper = styled.div`
  width: 63%;
`;

export const UserRanking = styled.div`
  display: flex;
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

export const ScrollText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ChallengeList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1024px;
`;

export const FirstPopularChallenge = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FirstPopularImage = styled.div`
  display: flex;
  justify-content: center;
`;

export const UserRankingList = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2%;
`;
