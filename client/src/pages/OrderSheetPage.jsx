import { useState, useEffect, useId } from 'react';
import axios from 'axios';

import * as S from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx';

import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';

// props보다는 구조분해해서 사용하기({image,name....})
function OrderSheetPage(props) {
  const id = useId();
  // 객체를 사용할거면 orderList보다는 order, orderList사용 시 배열로
  const [orderList, setOrderList] = useState([
    {
      image: '', //이름 명확히 ex)imageURL 약어는 좋지 않음! 모든 것!!
      name: '',
      money: '',
      startPeriod: '',
      expirationPeriod: '',
      quantity: '',
      tax: '',
    },
  ]);

  // useEffect(() => {
  //   axios.get(`/order`).then((res) => {
  //     //
  //     const orders = res.data;
  //     console.log(orders);
  //     setOrderList(orders);
  //   });
  // }, []);
  return (
    <S.OrderSheetInfoPageComponent>
      <h1 className="order-title">주문서 작성</h1>
      {orderList.map(
        ({
          image,
          name,
          startPeriod,
          expirationPeriod,
          quantity,
          money,
          tax,
        }) => (
          <div key={id}>
            <S.Header>
              <S.OrderLists>
                {/* map함수로 바꿔보기 */}

                <img className="image-size" src={image} alt="product img" />
                <S.OrderList>
                  <div className="challenge-title">{name}</div>
                  <div>시작 날짜 : {startPeriod}</div>
                  <div>종료 날짜 : {expirationPeriod}</div>
                </S.OrderList>
                <div className="count">수량: {quantity}</div>
              </S.OrderLists>
            </S.Header>
            <S.Main>
              <S.OrderLeft>
                <S.OrderInfoTop>
                  <h2 className="order-title">주문 정보</h2>
                  <div>참가비 : {money}원</div>
                </S.OrderInfoTop>
                <S.OrderInfoBottom>
                  <h2 className="order-title">결제 수단</h2>
                  <S.PayButton>카카오페이</S.PayButton>
                </S.OrderInfoBottom>
              </S.OrderLeft>
              <S.OrderRight>
                <OrderSheetInfo money={money} tax={tax} />
              </S.OrderRight>
            </S.Main>
          </div>
        )
      )}
    </S.OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
