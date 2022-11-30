import { useNavigate } from 'react-router-dom';

import * as S from '../../style/ChallengeList/Challenge.styled';

export default function Challenge({ id, title, description, image }) {
  const navigate = useNavigate();

  /**챌린지 상세 페이지로 이동 & 용도에 맞게 이름 바꾸기*/
  const moveToChallengeDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <S.CardContainer>
      <S.CardContents className="face1">
        <S.UpperCard>
          <img alt="challengeImage" src={image} />
          <h4>{title}</h4>
        </S.UpperCard>
      </S.CardContents>
      <S.CardContents className="face2">
        <S.LowerCard>
          <p>{description}</p>
          <span onClick={moveToChallengeDetail}>Read More</span>
        </S.LowerCard>
      </S.CardContents>
    </S.CardContainer>
  );
}
