import { useNavigate } from 'react-router-dom';

import * as S from '../../style/ChallengeList/Challenge.styled';

export default function Challenge({
  challengeId,
  challengeTitle,
  challengeDescription,
}) {
  const navigate = useNavigate();

  /**챌린지 상세 페이지로 이동 */
  const clickDetail = () => {
    navigate(`/detail/${challengeId}`);
  };

  return (
    <S.Card>
      <S.Face className="face1">
        <S.ContentA>
          <img
            alt="chllenge"
            src="https://wp.penguin.co.uk/wp-content/uploads/2022/01/Penguin-Reading20Challenge-main-image-1800x1200-1.jpg"
          />
          <h4>{challengeTitle}</h4>
        </S.ContentA>
      </S.Face>
      <S.Face className="face2">
        <S.ContentB>
          <p>{challengeDescription}</p>
          <span onClick={clickDetail}>Read More</span>
        </S.ContentB>
      </S.Face>
    </S.Card>
  );
}
