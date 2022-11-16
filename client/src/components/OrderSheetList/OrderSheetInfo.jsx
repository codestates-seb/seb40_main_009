import * as S from '../../style/OrderSheetListStyle/OrderSheetInfoStyle';

function OrderSheetInfo({ money }) {
  return (
    <S.OrderSheetInfoComponent>
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
    </S.OrderSheetInfoComponent>
  );
}

export default OrderSheetInfo;
