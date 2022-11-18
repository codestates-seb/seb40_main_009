import styled from 'styled-components';

export const Container = styled.header`
  width: 1024px;
  margin: 0 auto;
  padding-top: 120px;
`;

export const Recruitment = styled.div`
  display: flex;
  & > img {
    height: 350px;
    width: 34%;
    border-radius: 20px 0 0 20px;
  }
  & > div {
    background-color: #eff1fe;
    height: 350px;
    width: 30%;
    position: absolute;
    top: 120px;
    right: 645px;
    border-radius: 20px;
  }
`;

export const Description = styled.div`
  padding: 5%;
  font-size: 17px;
  & > .challenge-name {
    margin-bottom: 6%;
    font-size: 30px;
    display: flex;
    justify-content: center;
  }
`;

export const Title = styled.div`
  display: flex;
  & > .pd-5 {
    padding-right: 5%;
  }
`;

export const PaddingB = styled.div`
  padding-bottom: 10%;
`;
