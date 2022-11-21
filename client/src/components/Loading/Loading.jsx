import * as S from '../../style/LoadingStyle/LoadingStyle';
import spinner from '../../image/spinner.gif';
function Loading() {
  return (
    <S.Background>
      <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
      <img src={spinner} alt="로딩중" width="10%" />
    </S.Background>
  );
}

export default Loading;
