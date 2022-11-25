import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split('=')[1]; // 인가코드

  // const IP = `https://f069-203-130-71-252.jp.ngrok.io`;
  // https://f069-203-130-71-252.jp.ngrok.io/oauth/kakao?code=t4dsdWuocumOTK9VKJ7WOIi0sNLrabj5Q6qw6Sq0e_zRQKjlJ1lKsH4ii61JcZ94KURT9go9cpgAAAGErKFvDA

  const getKakaoToken = async () => {
    try {
      axios
        .get(`/oauth/kakao?code=${KAKAO_CODE}`, {
          // .get(`${IP}/oauth/kakao?code=${KAKAO_CODE}`, {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        })
        .then((response) => response.json())
        .then((data) => {
          // localStorage.setItem('memberId', data.memberId);
          // localStorage.setItem('memberEmail', data.memberEmail);
          // localStorage.setItem('memberName', data.memberName);
          // localStorage.setItem('imageUrl', data.imageUrl);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/');
        });
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
