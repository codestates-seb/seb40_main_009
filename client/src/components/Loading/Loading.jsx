import * as S from '../../style/LoadingStyle/LoadingStyle';

function Loading() {
  return (
    <S.Background>
      <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
      <img src="./img/spinner.gif" alt="로딩중" width="10%" />
    </S.Background>
  );
}

export default Loading;
