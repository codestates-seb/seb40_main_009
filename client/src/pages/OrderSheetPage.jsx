import { useState, useEffect, useId } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import * as S from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx';

import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';

// props보다는 구조분해해서 사용하기({image,name....})
function OrderSheetPage() {
  const id = useId();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  // 객체를 사용할거면 orderList보다는 order, orderList사용 시 배열로
  const [orderList, setOrderList] = useState(location.state);
  console.log('la', orderList);
  // console.log('11', Tax);

  return (
    <S.OrderSheetInfoPageComponent>
      <h1 className="order-title">주문서 작성</h1>
      <S.Header>
        <S.OrderLists>
          <img className="image-size" src={orderList.image} alt="product img" />
          <S.OrderList>
            <div className="challenge-title">{orderList.title}</div>
            <div>시작 날짜 : {orderList.startDate}</div>
            <div>종료 날짜 : {orderList.endDate}</div>
          </S.OrderList>
          <div className="count">수량: 1</div>
        </S.OrderLists>
      </S.Header>
      <S.Main>
        <S.OrderLeft>
          <S.OrderInfoTop>
            <h2 className="order-title">주문 정보</h2>
            <div>참가비 : {orderList.price}원</div>
            <p style={{ fontSize: '10px' }}>
              {/* 세금({orderList.price * 0.1})포함 금액 */}
            </p>
          </S.OrderInfoTop>
          <S.OrderInfoBottom>
            <h2 className="order-title">결제 수단</h2>
            <S.PayButton>카카오페이</S.PayButton>
          </S.OrderInfoBottom>
        </S.OrderLeft>
        <S.OrderRight>
          <OrderSheetInfo price={orderList.price} title={orderList.title} />
        </S.OrderRight>
      </S.Main>
      {/* </div>
        )
      )} */}
    </S.OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
