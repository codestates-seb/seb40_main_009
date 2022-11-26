import { useParams } from 'react-router-dom';

import * as S from '../style/SearchResult/SearchResult.styled';

import ChallengeResult from '../components/SearchResult/ChallengeResult';
import MemberResult from '../components/SearchResult/MemberResult';

export default function SearchResult() {
  const { name, id } = useParams();

  return (
    <S.ListContainer>
      {name === 'challenge' ? (
        <ChallengeResult searchValue={id} />
      ) : (
        <MemberResult searchValue={id} />
      )}
    </S.ListContainer>
  );
}
