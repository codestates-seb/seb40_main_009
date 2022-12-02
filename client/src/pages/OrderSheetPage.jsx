import { useState, useEffect, useId } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import {
  OrderSheetInfoPageComponent,
  Header,
  OrderLists,
  OrderList,
  PayButton,
  Main,
  OrderLeft,
  OrderInfoTop,
  OrderInfoBottom,
  OrderRight,
} from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx';

import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';

function OrderSheetPage() {
  const location = useLocation();
  // 객체를 사용할거면 orderList보다는 order, orderList사용 시 배열로
  const [orderList, setOrderList] = useState(location.state);
  console.log('la', orderList);

  return (
    <OrderSheetInfoPageComponent>
      <h1 className="order-title">주문서 작성</h1>
      <Header>
        <OrderLists>
          <img className="image-size" src={orderList.image} alt="product img" />
          <OrderList>
            <div className="challenge-title">{orderList.title}</div>
            <div>시작 날짜 : {orderList.startDate}</div>
            <div>종료 날짜 : {orderList.endDate}</div>
          </OrderList>
          <div className="count">수량: 1</div>
        </OrderLists>
      </Header>
      <Main>
        <OrderLeft>
          <OrderInfoTop>
            <h2 className="order-title">주문 정보</h2>
            <div>참가비 : {orderList.price}원</div>
            <p style={{ fontSize: '10px' }}></p>
          </OrderInfoTop>
          <OrderInfoBottom>
            <h2 className="order-title">결제 수단</h2>
            <PayButton>카카오페이</PayButton>
          </OrderInfoBottom>
        </OrderLeft>
        <OrderRight>
          <OrderSheetInfo price={orderList.price} title={orderList.title} />
        </OrderRight>
      </Main>
    </OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
