import axios from 'axios';
import { useForm } from 'react-hook-form';

import {
  OrderSheetInfoPageComponent,
  // Header,
  // OrderLists,
  // OrderList,
  PayButton,
  Main,
  OrderLeft,
  OrderInfoTop,
  OrderInfoBottom,
  OrderRight,
  Container,
  CheckPay,
  OrderButton,
  InfoContainerLists,
} from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx';

function OrderSheetPage() {
  const { register, handleSubmit } = useForm();

  const onPayment = async (data) => {
    data.orderTax = `${data.totalAmount * 0.1}`;
    console.log(data);

    try {
      const response = await axios.post('order/ready', data, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Authorization: localStorage.getItem('authorizationToken'),
        },
      });
      const KAKAO_PAYMENT_URL = response.data.data.next_redirect_pc_url;
      localStorage.setItem('TID', response.data.data.tid);
      window.location.href = KAKAO_PAYMENT_URL;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderSheetInfoPageComponent onSubmit={handleSubmit(onPayment)}>
      <h1 className="order-title">주문서 작성</h1>
      <Main>
        <OrderLeft>
          <OrderInfoTop>
            <h2 className="order-title">주문 정보</h2>
            <input
              type={'text'}
              value={'wiseLife Point'}
              {...register('itemName')}
              hidden
            />
            <input type={'number'} value={1} {...register('quantity')} hidden />
            <label>
              <input
                type={'radio'}
                value={'1000'}
                {...register('totalAmount')}
              />
              1,000원
            </label>
            <label>
              <input
                type={'radio'}
                value={'5000'}
                {...register('totalAmount')}
              />
              5,000원
            </label>
            <label>
              <input
                type={'radio'}
                value={'10000'}
                {...register('totalAmount')}
              />
              10,000원
            </label>
            <label>
              <input
                type={'radio'}
                value={'50000'}
                {...register('totalAmount')}
              />
              50,000원
            </label>
            <label>
              <input
                type={'radio'}
                value={'100000'}
                {...register('totalAmount')}
              />
              100,000원
            </label>
          </OrderInfoTop>
          <OrderInfoBottom>
            <h2 className="order-title">결제 수단</h2>
            <PayButton>카카오페이</PayButton>
          </OrderInfoBottom>
        </OrderLeft>
        <OrderRight>
          <Container>
            <InfoContainerLists>
              <h1 className="order-info-title">결제 정보</h1>
              <h2> 충전 포인트 : 원</h2>
              <CheckPay>
                <input className="check-input-box" type="checkbox"></input>
                <span>동의합니다</span>
                <OrderButton>결제하기</OrderButton>
              </CheckPay>
            </InfoContainerLists>
          </Container>
        </OrderRight>
      </Main>
    </OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
