import styled from 'styled-components';
// import KakaoLoginImage from '../../image/kakaoSmall.png';
import KakaoLoginButton from '../../image/kakaoIcon.png';
import { REST_API_KEY, REDIRECT_URI } from './KakaoLoginData';

export const LoginComponent = styled.div`
  padding-top: 10rem;
`;

function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  console.log(KAKAO_AUTH_URL);
  return (
    <LoginComponent>
      {/* <img src={KakaoLoginImage} alt="로그인 버튼" /> */}
      <img src={KakaoLoginButton} alt="로그인 버튼" onClick={handleLogin} />
    </LoginComponent>
  );
}
export default Login;
// 1.리다이렉트 url만들기
// 2. 토큰값 확인 + 저장(저장되어있음 저장 x)
// 3. 메인페이지로 이동(||직전)
