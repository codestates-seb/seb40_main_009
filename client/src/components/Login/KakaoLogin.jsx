import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  REST_API_KEY,
  REDIRECT_URI,
  LoginState,
} from '../Login/KakaoLoginData';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(LoginState);
  const KAKAO_CODE = location.search.split('=')[1]; // 인가코드
  console.log('hi');
  // 로그인
  const getKakaoToken = async () => {
    try {
      const response = await axios.get(`/oauth/kakao?code=${KAKAO_CODE}`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      console.log('login data : ', response);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('authorizationToken', response.data.accessToken);
      localStorage.setItem('LoginId', response.data.memberId);
      localStorage.setItem('LoginName', response.data.memberName);
      localStorage.setItem('memberMoney', response.data.memberMoney);
      setLoginState(true);
      navigate('/');
      // .catch(async (error) => {
      //   if (error.response.data.status === 401) {
      //     try {
      //       const responseToken = await axios.get('/token', {
      //         headers: {
      //           'ngrok-skip-browser-warning': 'none',
      //           refresh: localStorage.getItem('refreshToken'),
      //         },
      //       });
      //       await localStorage.setItem(
      //         'authorizationToken',
      //         responseToken.headers.authorization
      //       );
      //     } catch (error) {
      //       console.log('재요청 실패', error);
      //     }
      //   }
      // }
      // );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return <div>KakaoLogin</div>;
}
export default KakaoLogin;
