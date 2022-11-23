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
  margin-top: 8%;
`;

export const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

export const FontSize30 = styled.div`
  font-size: 30px;
`;

export const Flex = styled.div`
  display: flex;
`;

export const TitleWrapper = styled.div`
  font-size: 30px;
  margin-bottom: 5%;
  & > .wrapper {
    display: flex;
    align-items: center;
    width: 375%;
  }
  & > .wrapper .title {
    margin-right: auto;
  }
  & > .wrapper .view_all {
    font-size: 15px;
    cursor: pointer;
  }
`;

export const MemberOfTheMonth = styled.img`
  width: 350px;
  height: 350px;
`;

export const MarginLeft = styled.div`
  margin-left: 3%;
`;

export const Members = styled.div`
  background-color: #f2f4fe;
  border-radius: 10px;
  width: 375%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 8.5%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

  & > div {
    margin: 1%;
  }
`;
