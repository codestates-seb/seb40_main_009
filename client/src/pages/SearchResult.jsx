import { useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import * as S from '../style/SearchResult/SearchResult.styled';

import ChallengeResult from '../components/SearchResult/ChallengeResult';
import MemberResult from '../components/SearchResult/MemberResult';

export default function SearchResult() {
  const challengeMatch = useMatch('/search/challenge');
  const memberMatch = useMatch('/search/member');
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
        <Link to={'/search/member'}>
          <S.Tab isActive={memberMatch !== null}>멤버</S.Tab>
        </Link>
      </section>

      <Routes>
        <Route path="challenge" element={<ChallengeResult />} />
        <Route path="member" element={<MemberResult />} />
      </Routes>
    </S.ListContainer>
  );
}
