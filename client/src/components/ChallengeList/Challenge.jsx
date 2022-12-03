import { useNavigate } from 'react-router-dom';
import { isAfter, format, parseISO } from 'date-fns';

import * as S from '../../style/ChallengeList/Challenge.styled';
import { useRecoilValue } from 'recoil';
import { LoginState } from '../Login/KakaoLoginData';

export default function Challenge({ id, title, description, image, endDate }) {
  const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();

  /**챌린지 상세 페이지로 이동*/
  const moveToChallengeDetail = () => {
    if (!isLogin) {
      alert('로그인 후 확인하실 수 있습니다.');
      navigate('/');
    } else {
      navigate(`/detail/${id}`);
    }
  };

  function checkLateParticipate() {
    const today = format(Date.now(), 'yyyy-MM-dd');
    return !isAfter(parseISO(today), parseISO(endDate));
  }

  console.log(checkLateParticipate());

  return (
    <S.CardContainer checkLateParticipate={checkLateParticipate()}>
      <S.CardContents
        className="face1"
        checkLateParticipate={checkLateParticipate()}
      >
        <S.UpperCard>
          <img alt="challengeImage" src={image} />
          <h4>{title}</h4>
        </S.UpperCard>
      </S.CardContents>
      <S.CardContents className="face2">
        <S.LowerCard checkLateParticipate={checkLateParticipate()}>
          <p>{description}</p>
          <span onClick={moveToChallengeDetail}>Read More</span>
        </S.LowerCard>
      </S.CardContents>
    </S.CardContainer>
  );
}
