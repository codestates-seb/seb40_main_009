import { useEffect } from 'react';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import Challenge from '../components/ChallengeList/Challenge';
import * as S from '../style/ChallengeList/ChallengeList.styled';

function ChallengeList() {
  const paidChallenge = useMatch('/challengelist/paid');
  const freeChallenge = useMatch('/challengelist/free');
  const navMatch = useMatch('/challengelist');
  const navigate = useNavigate();

  useEffect(() => {
    if (navMatch) {
      navigate('/challengelist/paid');
    }
  }, []);
  return (
    <>
      <S.AddChallengeBtn>Add Challenge</S.AddChallengeBtn>
      <S.ListContainer>
        <section>
          <Link to={'/challengelist/paid'}>
            <S.Tab isActive={paidChallenge}>유료챌린지</S.Tab>
          </Link>
          <Link to={'/challengelist/free'}>
            <S.Tab isActive={freeChallenge}>무료챌린지</S.Tab>
          </Link>
          <button>조회순</button>
          <button>생성순</button>
        </section>
        {paidChallenge ? (
          <S.Container>
            <Challenge />
            <Challenge />
            <Challenge />
            <Challenge />
          </S.Container>
        ) : (
          <S.Container>
            <Challenge />
            <Challenge />
            <Challenge />
          </S.Container>
        )}

        <Routes>
          <Route path="paid" />
          <Route path="free" />
        </Routes>
      </S.ListContainer>
    </>
  );
}

export default ChallengeList;
