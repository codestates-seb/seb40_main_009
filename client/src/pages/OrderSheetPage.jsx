import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import OrderSheetInfo from '../components/OrderSheetList/OrderSheetInfo';

const OrderSheetInfoPageComponent = styled.div`
  width: 1024px;
  color: #595959;
  font-size: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    border-bottom: 0.2rem solid #595959;
    padding-bottom: 1rem;
  }
  .container {
    display: flex;
    /* flex-direction: column; */
  }
`;
const OrderSheet = styled.div`
  .image-size {
    width: 200px;
    height: 200px;
    margin-right: 2.5rem;
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    border-top: 0.1rem solid #595959;
    padding: 2rem 0;
  }
  .make-order-sheets {
    display: flex;
    margin: 2.5rem 0;
  }

  .make-order-sheet {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .challenge-tittle {
      font-size: 20px;
      line-height: 2.5rem;
    }
  }
  .price-order-sheet {
    line-height: 2.5rem;
    margin: 2.5rem 0;
  }
  .pay-button {
    width: 200px;
    height: 60px;
    background-color: #fbe34d;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
  .left-order {
    width: 60%;
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
      <h1>주문서 작성</h1>
      <OrderSheet>
        <div className="make-order-sheets">
          <img className="image-size" src={orderList.image} alt="product img" />
          <div className="make-order-sheet">
            <div className="challenge-tittle">{orderList.name}</div>
            <p>시작 날짜 : {orderList.startPeriod}</p>
            <p>종료 날짜 : {orderList.expirationPeriod}</p>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              border: '1px solid red',
              marginRight: 'auto',
              width: '100%',
            }}
          >
            <div className="price-order-sheet">
              <h2>주문정보</h2>
              <p>참가비 : {orderList.money}원</p>
            </div>
            <div>
              <h2>결제 수단</h2>
              <button className="pay-button">카카오페이</button>
            </div>
          </div>
          <div style={{ border: '1px solid blue' }}>
            <OrderSheetInfo money={orderList.money} />
          </div>
        </div>
      </OrderSheet>
    </OrderSheetInfoPageComponent>
  );
}

export default OrderSheetPage;
