import styled from 'styled-components';

const OrderSheetInfoComponent = styled.div`
  .info-container {
    width: 350px;
    height: 400px;
    padding: 1rem;
    border: 0.12rem solid #595959;
    border-radius: 10px;
  }
  .info-container-lists {
    padding: 1rem;
    line-height: 2rem;
  }
  .order-info-title {
    font-size: 24px;
    margin: 1rem 0;
  }
  .check-and-pay {
    padding-top: 2rem;
    margin-left: 2rem;
  }
  .check-input-box {
    margin-left: 25%;
  }
  .order-button {
    color: #ffffff;
    font-size: 24px;
    width: 250px;
    height: 80px;
    margin-top: 1rem;
    background-color: #8673ff;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
`;
function OrderSheetInfo({ money }) {
  return (
    <OrderSheetInfoComponent>
      <form className="info-container">
        <div className="info-container-lists">
          <h1 className="order-info-title">결제 정보</h1>
          <h2>참가비 : {money}원</h2>
          <div>100% 성공 시 : 참가비 + 상금</div>
          <div>80% 성공 시 : 달성률에 따른 원금 + 상금</div>
          <div>50% 성공 시 : 달성률에 따른 원금 + 상금</div>
          <div className="check-and-pay">
            <input className="check-input-box" type="checkbox" />
            <span>동의합니다</span>
            <button className="order-button">결제하기</button>
          </div>
        </div>
      </form>
    </OrderSheetInfoComponent>
  );
}

export default OrderSheetInfo;
