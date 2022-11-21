import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const MainContainer = styled.footer`
  width: 100%;
`;

export const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

export const Background = styled.div`
  background-color: #8673ff;
`;

export const FirstPage = styled.div`
  height: 70%;
  color: #ffffff;
`;

export const FirstPageText = styled.span`
  font-size: 35px;
  left: 300%;
`;

export const FirstPageText2 = styled.span`
  font-size: 20px;
`;

export const FirstPageImg = styled.img`
  position: absolute;
  top: 10%;
  right: -199%;
  width: 190%;
`;

export const FontSize50 = styled.div`
  font-size: 50px;
`;

export const FontSize30 = styled.div`
  font-size: 30px;
`;

export const FontSize30M3 = styled.div`
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
export const Mt4 = styled.div`
  margin-top: 8%;
`;

export const MonthlyUser = styled.img`
  width: 350px;
  height: 350px;
`;

export const MarginLeft3 = styled.div`
  margin-left: 3%;
`;

export const AllUser = styled.div`
  background-color: #F2F4FE;
  border-radius:10px;
  width: 375%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 8.5%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
 
  & > div {
    margin:1%;
`;

export const PageFive = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
