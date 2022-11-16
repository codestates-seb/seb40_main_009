import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';

const OrderSheetInfoPageComponent = styled.div`
  width: 1024px;
  font-size: 18px;
  color: #595959;
  margin: auto;
  .order-sheet {
    border-top: 0.2rem solid #595959;
    border-bottom: 0.12rem solid #595959;
  }
  .order-lists {
    display: flex;
  }
  .challenge-title {
    margin: 1rem 0;
  }
  .challenge-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .image-size {
    width: 200px;
    height: 200px;
    margin: 2.5rem 2.5rem 2.5rem 0;
  }
  .order-title {
    font-size: 24px;
    margin: 1rem 0;
  }
  .order-info {
    display: flex;
    margin-top: 1rem;
  }
  .order-left {
    width: 100%;
  }
  .order-info-top {
    line-height: 3rem;
    padding-bottom: 4rem;
  }
  .order-info-bottom {
    line-height: 3rem;
    border-top: 0.12rem solid #595959;
    padding-top: 1rem;
    padding-bottom: 4rem;
  }
  .pay-button {
    width: 200px;
    height: 60px;
    background-color: #fbe34d;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }

  .order-right {
    margin: 1rem 0rem 0rem 1rem;
  }
`;

function OrderSheetPage({ money }) {
  const [orderList, setOrderList] = useState({
    image: '',
    name: '',
    money: '',
    startPeriod: '',
    expirationPeriod: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/order`).then((res) => {
      console.log(res.data);
      setOrderList(...res.data);
    });
  }, []);
  return (
    <OrderSheetInfoPageComponent>
      <h1 className="order-title">주문서 작성</h1>
      <header className="order-sheet">
        <div className="order-lists">
          <img className="image-size" src={orderList.image} alt="product img" />
          <div className="challenge-date">
            <p className="challenge-title">{orderList.name}</p>
            <p>시작 날짜 : {orderList.startPeriod}</p>
            <p>종료 날짜 : {orderList.expirationPeriod}</p>
          </div>
        </div>
      </header>
      <main className="order-info">
        <div className="order-left">
          <div className="order-info-top">
            <h2 className="order-title">주문 정보</h2>
            <p>참가비 : {orderList.money}원</p>
          </div>
          <div className="order-info-bottom">
            <h2 className="order-title">결제 수단</h2>
            <button className="pay-button">카카오페이</button>
          </div>
        </div>
        <div className="order-right">
          <OrderSheetInfo money={orderList.money} />
        </div>
      </main>
    </OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
