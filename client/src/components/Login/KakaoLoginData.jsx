import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//'설정한 리다이렉트 URL을 넣어준다'
// 중요한 정보이기 때문에 따로 관리
export const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
export const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

//1. 아무것도 설정 안 하고 쓰는 경우
//localStorage에 저장되며, key 이름은 'recoil-persist'로 저장됨
// 새로고침하면 초기화 되는 거 해결
const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
