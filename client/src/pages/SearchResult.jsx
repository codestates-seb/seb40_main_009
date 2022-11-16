import { useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import ChallengeResult from '../components/SearchResult/ChallengeResult';
import UserResult from '../components/SearchResult/UserResult';
import * as S from '../style/SearchResult/SearchResult.styled';

function SearchResult() {
  const challengeMatch = useMatch('/search/challenge');
  const userMatch = useMatch('/search/user');
  const navMatch = useMatch('/search');
  const navigate = useNavigate();

  useEffect(() => {
    if (navMatch) {
      navigate('/search/challenge');
    }
  }, []);

  return (
    <S.ListContainer>
      <section>
        <Link to={'/search/challenge'}>
          <S.Tab isActive={challengeMatch !== null}>챌린지</S.Tab>
        </Link>
        <Link to={'/search/user'}>
          <S.Tab isActive={userMatch !== null}>유저</S.Tab>
        </Link>
      </section>

      <Routes>
        <Route path="challenge" element={<ChallengeResult />} />
        <Route path="user" element={<UserResult />} />
      </Routes>
    </S.ListContainer>
  );
}

export default SearchResult;
