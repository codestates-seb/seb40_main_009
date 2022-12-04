import axios from 'axios';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginState } from './KakaoLoginData';
import { useSetRecoilState } from 'recoil';

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(LoginState);

  const KAKAO_CODE = location.search.split('=')[1]; // 인가코드

  // 로그인
  const getKakaoToken = async () => {
    try {
      const response = await axios.get(`/oauth/kakao?code=${KAKAO_CODE}`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('authorizationToken', response.data.accessToken);
      localStorage.setItem('LoginId', response.data.memberId);
      localStorage.setItem('LoginName', response.data.memberName);
      localStorage.setItem('memberMoney', response.data.memberMoney);
      setLoginState(true);
      navigate('/');
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
