import { useNavigate } from 'react-router-dom';

import * as S from '../../style/ChallengeList/Challenge.styled';

export default function Challenge({
  challengeId,
  challengeTitle,
  challengeDescription,
}) {
  const navigate = useNavigate();

  /**챌린지 상세 페이지로 이동 & 용도에 맞게 이름 바꾸기*/
  const moveToChallengeDetail = () => {
    navigate(`/detail/${challengeId}`);
  };

  return (
    <S.CardContainer>
      <S.CardContents className="face1">
        <S.UpperCard>
          <img
            alt="chllenge"
            src="https://wp.penguin.co.uk/wp-content/uploads/2022/01/Penguin-Reading20Challenge-main-image-1800x1200-1.jpg"
          />
          <h4>{challengeTitle}</h4>
        </S.UpperCard>
      </S.CardContents>
      <S.CardContents className="face2">
        <S.LowerCard>
          <p>{challengeDescription}</p>
          <span onClick={moveToChallengeDetail}>Read More</span>
        </S.LowerCard>
      </S.CardContents>
    </S.CardContainer>
  );
}
