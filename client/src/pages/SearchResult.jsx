import { useEffect } from 'react';
import {
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';

import * as S from '../style/SearchResult/SearchResult.styled';

import ChallengeResult from '../components/SearchResult/ChallengeResult';
import MemberResult from '../components/SearchResult/MemberResult';

export default function SearchResult() {
  const searchMatch = useMatch('/search');
  const searchChallengeMatch = useMatch('/search/challenge');
  const searchMembernavMatch = useMatch('/search/member');
  const navigate = useNavigate();
  const { name, id } = useParams();

  console.log('name', name, 'id', id);

  useEffect(() => {
    if (searchMatch || searchChallengeMatch || searchMembernavMatch) {
      navigate('/');
    }
  }, []);

  return (
    <S.ListContainer>
      {name === 'challenge' ? (
        <ChallengeResult searchValue={id} />
      ) : (
        <MemberResult searchValue={id} />
      )}

      <Routes>
        <Route path={`challenge/:id`} element={<ChallengeResult />} />
        <Route path={`member/:id`} element={<MemberResult />} />
      </Routes>
    </S.ListContainer>
  );
}
