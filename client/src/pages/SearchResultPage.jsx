import { useParams } from 'react-router-dom';

import { ListContainer } from '../style/SearchResult/SearchResult.styled';

import ChallengeResult from '../components/SearchResult/ChallengeResult';
import MemberResult from '../components/SearchResult/MemberResult';

export default function SearchResultPage() {
  const { name, id } = useParams();

  return (
    <ListContainer>
      {name === 'challenge' ? (
        <ChallengeResult searchValue={id} />
      ) : (
        <MemberResult searchValue={id} />
      )}
    </ListContainer>
  );
}
