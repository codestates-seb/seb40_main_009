//'설정한 리다이렉트 URL을 넣어준다'
// 중요한 정보이기 때문에 따로 관리
import { atom } from 'recoil';

export const REST_API_KEY = `e9cbf2e31aa946c52e55e753135126c3`;
export const REDIRECT_URI = `http://localhost:3000/oauth/callback/kakao`;

export const LoginState = atom({
  key: 'LoginState',
  default: false,
});
