import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';

import * as S from '../style/ChallengeList/ChallengeList.styled';

import Challenge from '../components/ChallengeList/Challenge';
import Loading from '../components/Loading/Loading';

export default function ChallengeList() {
  const [challengeList, setChallengeList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filterSelect, setFilterSelect] = useState('1');
  const [categorySelect, setCategorySelect] = useState('1');

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

  //카테고리 설정
  const setCategory = (event) => {
    const { value } = event.currentTarget;
    setCategorySelect(value);
  };

  //필터 설정 인기순/최신순
  const onSelect = (event) => {
    setFilterSelect(event.target.value);
  };
  const filterValue = filterList[filterSelect - 1].filterName;

  //카테고리 & 필터별 데이터 가져오기
  const challengeFiltering = useCallback(async () => {
    setLoading(true);
    setChallengeList([]);
    try {
      const response = await axios.get(
        `/challenges/all/${categorySelect}?sort-by=${filterValue}&page=1&size=10`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const challenges = response.data.data;
      setChallengeList(challenges);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [categorySelect, filterValue]);

  useEffect(() => {
    challengeFiltering();
  }, [challengeFiltering]);

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
          {categoryList.map(({ id, category, tabName }) => (
            <Link to={`/challengelist/${category}`} key={id}>
              <S.Tab
                onClick={setCategory}
                value={id}
                isActive={id === categorySelect}
              >
                {tabName}
              </S.Tab>
            </Link>
          ))}
          <select value={filterSelect} onChange={onSelect}>
            {filterList.map(({ id, value }) => (
              <option key={id} value={id}>
                {value}
              </option>
            ))}
          </select>
        </section>
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
      </S.ListContainer>
    </>
  );
}

const filterList = [
  {
    id: '1',
    filterName: 'popularity',
    value: '조회순 정렬',
  },
  {
    id: '2',
    filterName: 'newest',
    value: '최신순 정렬',
  },
];

const categoryList = [
  {
    id: '1',
    category: 'bucketlist',
    tabName: '버킷 리스트',
  },
  {
    id: '2',
    category: 'sharedchallenge',
    tabName: '공유 챌린지',
  },
  {
    id: '3',
    category: 'offlinechallenge',
    tabName: '오프라인 챌린지',
  },
];
