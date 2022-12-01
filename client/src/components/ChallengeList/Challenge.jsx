import { useNavigate } from 'react-router-dom';
import { isAfter, format } from 'date-fns';

import * as S from '../../style/ChallengeList/Challenge.styled';

export default function Challenge({ id, title, description, image, endDate }) {
  const navigate = useNavigate();

  /**챌린지 상세 페이지로 이동 & 용도에 맞게 이름 바꾸기*/
  const moveToChallengeDetail = () => {
    navigate(`/detail/${id}`);
  };

  // const checkEndDate = (endDate) => {
  //   endDate === new Date.now();
  // };
  // const a = format(Date.now(), 'yyyy, MM, dd');
  // const end = format(endDate, 'yyyy, MM, dd');
  // console.log(a);
  // console.log(endDate);
  // isAfter(a, endDate);

  // console.log(isAfter(endDate, a));
  return (
    <S.CardContainer>
      <S.CardContents className="face1" endDate={endDate}>
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
