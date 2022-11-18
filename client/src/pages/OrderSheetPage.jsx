import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';
import * as S from '../style/OrderSheetListStyle/OrderSheetPageStyle.jsx';

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
    <S.OrderSheetInfoPageComponent>
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
    </S.OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
