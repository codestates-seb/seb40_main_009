import * as S from '../../style/ChallengeList/Challenge.styled';
import { useNavigate } from 'react-router-dom';
function Challenge() {
  const navigate = useNavigate();

  const clickDetail = () => {
    navigate(`/detail/2`);
  };
  return (
    <>
      <S.Card>
        <S.Face className="face1">
          <S.ContentA>
            <img
              alt="chllenge"
              src="https://wp.penguin.co.uk/wp-content/uploads/2022/01/Penguin-Reading20Challenge-main-image-1800x1200-1.jpg"
            />
            <h4>ChallengeName</h4>
          </S.ContentA>
        </S.Face>
        <S.Face className="face2">
          <S.ContentB>
            <p>About Challenge, abcdefghijklmnopqrstuvwxyz</p>
            <span onClick={clickDetail}>Read More</span>
          </S.ContentB>
        </S.Face>
      </S.Card>
    </>
  );
}

export default Challenge;
