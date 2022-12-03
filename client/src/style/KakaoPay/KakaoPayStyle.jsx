import styled from 'styled-components';

export const CancellationPaymentComponent = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8673ff;
  padding-top: 10rem;
  font-size: 20px;

  h1 {
    font-size: 60px;
    text-align: right;
    border-bottom: 3px double #ffffff;
    width: 250px;
  }
  .font-width {
    width: 1024px;
    margin: auto;
    color: #ffffff;
  }
  .order-state {
    font-size: 30px;
  }
  .just-flex {
    display: flex;
    justify-content: space-between;
  }
  .back-home {
    font-size: 40px;
    line-height: 4rem;
    text-align: right;
    margin-right: 70px;
  }
`;

export const WiseLife = styled.div`
  line-height: 2rem;
`;

export const FooterLogo = styled.div`
  margin-top: 200px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5% 0 1% 0;
  text-align: right;
  & .name {
    margin-right: 2%;
  }
  & .icon {
    width: 10%;
  }
  & + .text {
    font-size: 13.5px;
    display: flex;
    justify-content: center;
  }
`;
