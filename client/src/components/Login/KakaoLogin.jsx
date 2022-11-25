import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { REST_API_KEY, REDIRECT_URI } from '../Login/KakaoLoginData';
import axios from 'axios';

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split('=')[1]; // 인가코드
  // let params = new URL(document.location.toString()).searchParams;
  // let code = params.get('code'); // 인가코드 받는 부분

  // const IP = `https://f069-203-130-71-252.jp.ngrok.io`;
  // https://f069-203-130-71-252.jp.ngrok.io/oauth/kakao?code=t4dsdWuocumOTK9VKJ7WOIi0sNLrabj5Q6qw6Sq0e_zRQKjlJ1lKsH4ii61JcZ94KURT9go9cpgAAAGErKFvDA
  // http://localhost:3000/oauth/callback/kakao?code=OpEGcxXb7mArgaLb7WSLG-9yPhvH3lTmYNfLftIYySzubNx-2ZNblf_w61io81iILCRkcgo9dGgAAAGEri1qVQ

  // console.log('aaaa', KAKAO_CODE);

  const getKakaoToken = useCallback(async () => {
    try {
      axios
        // .get(
        //   `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        //   {
        .get(`/oauth/kakao?code=${KAKAO_CODE}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        })
        .then((response) => {
          console.log('qqqqq', response);
          // localStorage.setItem('memberId', data.memberId);
          // localStorage.setItem('memberEmail', data.memberEmail);
          // localStorage.setItem('memberName', data.memberName);
          // localStorage.setItem('imageUrl', data.imageUrl);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('authorizationToken', response.data.accessToken);
          // navigate('/');
        })
        .then(window.location.replace('/'));
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
