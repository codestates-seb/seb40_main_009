import { useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import * as S from '../style/SearchResult/SearchResult.styled';

import ChallengeResult from '../components/SearchResult/ChallengeResult';
import MemberResult from '../components/SearchResult/MemberResult';

export default function SearchResult() {
  const challengeMatch = useMatch('/search/challenge');
  const memberMatch = useMatch('/search/member');
  const searchMatch = useMatch('/search');
  const searchChallengeMatch = useMatch('/search/challenge');
  const searchMembernavMatch = useMatch('/search/member');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchMatch || searchChallengeMatch || searchMembernavMatch) {
      navigate('/');
    }
  }, []);

  return (
    <S.ListContainer>
      <section>
        <Link to={'/search/challenge/:id'}>
          <S.Tab isActive={challengeMatch !== null}>챌린지</S.Tab>
        </Link>
        <Link to={'/search/member/:id'}>
          <S.Tab isActive={memberMatch !== null}>멤버</S.Tab>
        </Link>
      </section>

      <Routes>
        <Route path="challenge/:id" element={<ChallengeResult />} />
        <Route path="member/:id" element={<MemberResult />} />
      </Routes>
    </S.ListContainer>
  );
}
