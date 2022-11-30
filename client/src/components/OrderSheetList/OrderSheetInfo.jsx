import axios from 'axios';
import * as S from '../../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx.jsx';
// import { REST_API_KEY, REDIRECT_URI } from '../Login/KakaoLoginData';

function OrderSheetInfo({ price, title }) {
  const itemName = title;
  const totalAmount = price;

  const data = { itemName, totalAmount, orderTax: price * 0.1, quantity: 1 };
  console.log(data);

  const config = {
    method: 'post',
    url: `order/ready`,
    headers: {
      'ngrok-skip-browser-warning': 'none',
      Authorization:
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0OUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.NDuVoTw2oLhpffs07n_f0LMCZKUXSjA9R694EQVzHCwAFkzlay3EyWeWYdazmPDRagLOsSOrjjT5SZrjoKGMnw',
    },
    data: data,
  };
  const postKakaoPay = () => {
    axios(config)
      .then((response) => {
        console.log('rr', response.data.data);
        const KAKAO_PAYMENT_URL = response.data.data.next_redirect_pc_url;
        localStorage.setItem('TID', response.data.data.tid);
        window.location.href = KAKAO_PAYMENT_URL;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <S.Container>
      <S.InfoContainerLists>
        <h1 className="order-info-title">결제 정보</h1>
        <h2>참가비 : {price}원</h2>
        <div>세금 : {data.orderTax}원 포함</div>
        <div>100% 성공 시 : 참가비 + 상금</div>
        <div>80% 성공 시 : 달성률에 따른 원금 + 상금</div>
        <div>50% 성공 시 : 달성률에 따른 원금 + 상금</div>
        <S.CheckPay>
          <input className="check-input-box" type="checkbox"></input>
          <span>동의합니다</span>
          <S.OrderButton onClick={postKakaoPay}>결제하기</S.OrderButton>
        </S.CheckPay>
      </S.InfoContainerLists>
    </S.Container>
  );
}

export default OrderSheetInfo;
