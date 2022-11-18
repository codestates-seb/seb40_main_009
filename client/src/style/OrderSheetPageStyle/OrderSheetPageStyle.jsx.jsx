import styled from 'styled-components';

// OrderSheetPage.jsx
export const OrderSheetInfoPageComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  color: #595959;
  margin: auto;
  padding-top: 7rem;
  .challenge-title {
    margin: 1rem 0;
  }
`;

export const Header = styled.div`
  border-top: 0.2rem solid #595959;
  border-bottom: 0.12rem solid #595959;
`;

export const OrderLists = styled.div`
  display: flex;
  .image-size {
    width: 200px;
    height: 200px;
    margin: 2.5rem 2.5rem 2.5rem 0;
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .order-title {
    font-size: 24px;
    margin: 1rem 0;
  }
`;

export const PayButton = styled.button`
  width: 200px;
  height: 60px;
  background-color: #fbe34d;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

export const Main = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const OrderLeft = styled.div`
  width: 100%;
`;

export const OrderInfoTop = styled.div`
  line-height: 3rem;
  padding-bottom: 4rem;
`;

export const OrderInfoBottom = styled.div`
  line-height: 3rem;
  border-top: 0.12rem solid #595959;
  padding-top: 1rem;
  padding-bottom: 4rem;
`;

export const OrderRight = styled.div`
  margin: 1rem 0rem 0rem 1rem;
`;

// OrderSheetInfo.jsx
export const Container = styled.div`
  width: 350px;
  height: 400px;
  padding: 1rem;
  border: 0.12rem solid #595959;
  border-radius: 10px;
`;

export const InfoContainerLists = styled.div`
  padding: 1rem;
  line-height: 2rem;
  .order-info-title {
    font-size: 24px;
    margin: 1rem 0;
  }
`;

export const CheckPay = styled.div`
  padding-top: 2rem;
  margin-left: 2rem;

  .check-input-box {
    margin-left: 25%;
  }
`;

export const OrderButton = styled.button`
  color: #ffffff;
  font-size: 24px;
  width: 250px;
  height: 80px;
  margin-top: 1rem;
  background-color: #8673ff;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
