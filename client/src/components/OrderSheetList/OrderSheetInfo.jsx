import axios from 'axios';
import * as S from '../../style/OrderSheetPageStyle/OrderSheetPageStyle.jsx.jsx';
// import { REST_API_KEY, REDIRECT_URI } from '../Login/KakaoLoginData';

function OrderSheetInfo({ price, title }) {
  const itemName = title;
  const totalAmount = price;

  const data = { itemName, totalAmount, orderTax: price * 0.1, quantity: 1 };

  const config = {
    method: 'post',
    url: `order/ready`,
    headers: {
      'ngrok-skip-browser-warning': 'none',
      Authorization: localStorage.getItem('authorizationToken'),
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

  // const postKakaoPay = async () => {
  //   try {
  //     console.log(data);
  //     axios
  //       .post(`order/ready`, {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'none',
  //           Authorization: localStorage.getItem('authorizationToken'),
  //         },
  //         data: data,
  //       })
  //       .then((response) => {
  //         console.log('response', response);
  //         const KAKAO_PAYMENT_URL = response.data.data.next_redirect_pc_url;
  //         localStorage.setItem('TID', response.data.data.tid);
  //         window.location.href = KAKAO_PAYMENT_URL;
  //       })
  //       .catch(async (error) => {
  //         if (error.response.data.status === 401) {
  //           try {
  //             const responseToken = await axios.get('/token', {
  //               headers: {
  //                 'ngrok-skip-browser-warning': 'none',
  //                 refresh: localStorage.getItem('refreshToken'),
  //               },
  //             });
  //             await localStorage.setItem(
  //               'authorizationToken',
  //               responseToken.headers.authorization
  //             );
  //             // await localStorage.setItem(
  //             //   'test',
  //             //   responseToken.headers.authorization
  //             // );
  //           } catch (error) {
  //             console.log('재요청 실패', error);
  //           }
  //         }
  //       });
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

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
