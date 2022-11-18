import * as S from '../../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx.jsx';

function OrderSheetInfo({ money }) {
  return (
    <>
      <S.Container>
        <S.InfoContainerLists>
          <h1 className="order-info-title">결제 정보</h1>
          <h2>참가비 : {money}원</h2>
          <div>세금 : {money}원 포함</div>
          <div>100% 성공 시 : 참가비 + 상금</div>
          <div>80% 성공 시 : 달성률에 따른 원금 + 상금</div>
          <div>50% 성공 시 : 달성률에 따른 원금 + 상금</div>
          <S.CheckPay>
            <input className="check-input-box" type="checkbox"></input>
            <span>동의합니다</span>
            <S.OrderButton>결제하기</S.OrderButton>
          </S.CheckPay>
        </S.InfoContainerLists>
      </S.Container>
    </>
  );
}

export default OrderSheetInfo;
