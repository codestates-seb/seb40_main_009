import { Background, LoadingText } from '../../style/LoadingStyle/LoadingStyle';

import spinner from '../../image/spinner.gif';

export default function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={spinner} alt="로딩중" width="10%" />
    </Background>
  );
}
