import { useCallback, useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from '../style/ChallengeList/ChallengeList.styled';

import Challenge from '../components/ChallengeList/Challenge';
import Loading from '../components/Loading/Loading';

export default function ChallengeList() {
  const [challengeList, setChallengeList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navMatch = useMatch('/challengelist');
  const navigate = useNavigate();

  //챌린지 추가 페이지로 이동
  const moveToCreateChallenge = () => {
    navigate('/createchallenge/1');
  };

  useEffect(() => {
    if (navMatch) {
      navigate('/challengelist/bucketlist');
    }
  }, []);

  const test1 = 'bucketlist';
  const categoryCheck = useMatch(`/challengelist/${test1}`);
  // console.log('check', categoryCheck);

  const filter = [
    {
      id: 1,
      filterName: 'popularity',
      value: '조회순 정렬',
    },
    {
      id: 2,
      filterName: 'newest',
      value: '최신순 정렬',
    },
  ];

  const [index, setIndex] = useState('1');
  const onSelect = (event) => {
    setIndex(event.target.value);
  };

  const filterValue = filter[index - 1].filterName;

  //데이터 가져오기
  const challengeFiltering = useCallback(async () => {
    setLoading(true);
    setChallengeList([]);
    try {
      const response = await axios.get(`/challenges/all/sort-by-popularity/1`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      const challenges = response.data.data;
      setChallengeList(challenges);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    challengeFiltering();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <S.AddChallengeBtn onClick={moveToCreateChallenge}>
        <span>챌린지</span>
        <br />
        <span>추가</span>
      </S.AddChallengeBtn>
      <S.ListContainer>
        <section>
          <Link to={'/challengelist/bucketlist'}>
            <S.Tab isActive={categoryCheck}>버킷 리스트</S.Tab>
          </Link>
          <Link to={'/challengelist/sharedchallenge'}>
            <S.Tab isActive={categoryCheck}>공유 챌린지</S.Tab>
          </Link>
          <Link to={'/challengelist/offlinechallenge'}>
            <S.Tab isActive={categoryCheck}>오프라인 챌린지</S.Tab>
          </Link>
        </section>
        <select value={index} onChange={onSelect}>
          {filter.map(({ id, value }) => (
            <option key={id} value={id}>
              {value}
            </option>
          ))}
        </select>
        <S.Container>
          {challengeList.map(
            ({ challengeId, challengeTitle, challengeDescription }) => (
              <Challenge
                key={challengeId}
                challengeId={challengeId}
                challengeTitle={challengeTitle}
                challengeDescription={challengeDescription}
              />
            )
          )}
        </S.Container>
        {/* {paidChallenge ? (
          <S.Container>
            <Challenge />
          </S.Container>
        ) : (
          <S.Container>
            <Challenge />
          </S.Container>
        )} */}
      </S.ListContainer>
    </>
  );
}
