import styled from 'styled-components';

const OrderSheetInfoComponent = styled.div`
  border: 0.1rem solid #595959;
  width: 100%;
  height: 450px;
`;
function OrderSheetInfo({ money }) {
  return (
    <OrderSheetInfoComponent>
      <h1>결제 정보</h1>
      <h2>참가비 : {money}원</h2>
      <div>100% 성공 시 : 참가비 + 상금</div>
      <div>80% 성공 시 : 달성률에 따른 원금 + 상금</div>
      <div>50% 성공 시 : 달성률에 따른 원금 + 상금</div>
      <input type="checkbox"></input>
      <button>결제하기</button>
    </OrderSheetInfoComponent>
  );
}

export default OrderSheetInfo;
