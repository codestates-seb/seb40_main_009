import Challenge from '../components/ChallengeList/Challenge';
import * as S from '../style/ChallengeList/ChllengeList.styled';

function ChallengeList() {
  return (
    <S.ChallengeListContainer>
      <button>유료챌린지</button>
      <button>무료챌린지</button>
      <button>조회순</button>
      <button>생성순</button>
      <S.Container>
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
      </S.Container>
    </S.ChallengeListContainer>
  );
}

export default ChallengeList;
