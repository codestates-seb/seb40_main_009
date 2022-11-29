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

  const getKakaoToken = useCallback(async () => {
    try {
      axios
        .get(`/oauth/kakao?code=${KAKAO_CODE}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        })
        .then((response) => {
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('authorizationToken', response.data.accessToken);
          localStorage.setItem('LoginId', response.data.memberId);
          localStorage.setItem('LoginName', response.data.memberName);
          setLoginState(true);
          navigate('/');
        });
    } catch (error) {
      console.log('error: ', error);
    }
  }, [KAKAO_CODE]);

  useEffect(() => {
    getKakaoToken();
  }, [getKakaoToken]);

  return <div>KakaoLogin</div>;
}
export default KakaoLogin;
