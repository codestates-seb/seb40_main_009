import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import {
  OrderSheetInfoPageComponent,
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
  OrderButtonIsFalse,
} from '../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx';

export default function OrderSheetPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [isChargePoint, setChargePoint] = useState(0);
  const { register, handleSubmit } = useForm();

  const checked = () => {
    setIsChecked(!isChecked);
  };

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

  const answerCheck = (event) => {
    setChargePoint(event.target.value);
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
            {pointList.map((point, index) => (
              <label key={index}>
                <input
                  type={'radio'}
                  value={point}
                  {...register('totalAmount')}
                  onChange={(event) => answerCheck(event)}
                />
                {point
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp;원
              </label>
            ))}
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
              <h2>
                {' '}
                충전 포인트 :{' '}
                {isChargePoint
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp;원
              </h2>
              <CheckPay>
                <input
                  className="check-input-box"
                  type="checkbox"
                  onClick={checked}
                ></input>
                <span>동의합니다</span>
                {isChecked ? (
                  <OrderButton disabled={isChecked ? false : true}>
                    결제하기
                  </OrderButton>
                ) : (
                  <OrderButtonIsFalse disabled={isChecked ? false : true}>
                    결제하기
                  </OrderButtonIsFalse>
                )}
              </CheckPay>
            </InfoContainerLists>
          </Container>
        </OrderRight>
      </Main>
    </OrderSheetInfoPageComponent>
  );
}

const pointList = ['1000', '5000', '10000', '50000', '100000'];
