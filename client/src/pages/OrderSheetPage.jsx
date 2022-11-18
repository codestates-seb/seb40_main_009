import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';
import * as S from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx.jsx';

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
      <S.Header>
        <S.OrderLists>
          <img className="image-size" src={orderList.image} alt="product img" />
          <S.OrderList>
            <div className="challenge-title">{orderList.name}</div>
            <div>시작 날짜 : {orderList.startPeriod}</div>
            <div>종료 날짜 : {orderList.expirationPeriod}</div>
          </S.OrderList>
        </S.OrderLists>
      </S.Header>
      <S.Main>
        <S.OrderLeft>
          <S.OrderInfoTop>
            <h2 className="order-title">주문 정보</h2>
            <div>참가비 : {orderList.money}원</div>
          </S.OrderInfoTop>
          <S.OrderInfoBottom>
            <h2 className="order-title">결제 수단</h2>
            <S.PayButton>카카오페이</S.PayButton>
          </S.OrderInfoBottom>
        </S.OrderLeft>
        <S.OrderRight>
          <OrderSheetInfo money={orderList.money} />
        </S.OrderRight>
      </S.Main>
    </S.OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
