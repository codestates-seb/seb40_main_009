import React, { useCallback, useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import * as S from '../style/ChallengeList/ChallengeList.styled';

import Challenge from '../components/ChallengeList/Challenge';
import Loading from '../components/Loading/Loading';
import { LoginState } from '../components/Login/KakaoLoginData';

export default function ChallengeListPage() {
  const loginState = useRecoilValue(LoginState);
  const [challengeList, setChallengeList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filterSelect, setFilterSelect] = useState('1');
  const [categorySelect, setCategorySelect] = useState('1');
  const [pageNumber, setPageNumber] = useState(1);
  const [challengeTotalPages, setChallengeTotalPages] = useState();

  const [ref, inView] = useInView();

  const navMatch = useMatch('/challengelist');
  const navigate = useNavigate();

  /**챌린지 추가 페이지로 이동*/
  const moveToCreateChallenge = () => {
    navigate('/createchallenge/1');
  };

  useEffect(() => {
    if (navMatch) {
      navigate('/challengelist/bucketlist');
    }
  }, []);

  /**카테고리 설정*/
  const setCategory = (event) => {
    const { value } = event.currentTarget;
    setCategorySelect(value);
  };

  /**필터 설정 인기순/최신순*/
  const onSelect = (event) => {
    setFilterSelect(event.target.value);
  };

  const filterValue = filterList[filterSelect - 1].filterName;

  /**카테고리 & 필터별 데이터 GET 요청*/
  const challengeFiltering = useCallback(async () => {
    setLoading(true);
    setChallengeList([]);
    try {
      const response = await axios.get(
        `/challenges/all/${categorySelect}?sort-by=${filterValue}&page=1&size=12`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const challenges = response.data.data;

      setChallengeTotalPages(response.data.pageInfo.totalPages);
      setChallengeList(challenges);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [categorySelect, filterValue]);

  useEffect(() => {
    challengeFiltering();
  }, [challengeFiltering]);

  /** 무한 스크롤*/
  const getMemberList = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/challenges/all/${categorySelect}?sort-by=${filterValue}&page=${pageNumber}&size=12`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;

      if (pageNumber !== 1) {
        setChallengeList((prevMembers) => [...prevMembers, ...members]);
      }
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [pageNumber]);

  useEffect(() => {
    getMemberList();
  }, [getMemberList]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, isLoading]);

  return (
    <>
      {loginState ? (
        <S.AddChallengeButton onClick={moveToCreateChallenge}>
          <span>챌린지</span>
          <br />
          <span>추가</span>
        </S.AddChallengeButton>
      ) : null}
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
          <div>
            <select value={filterSelect} onChange={onSelect}>
              {filterList.map(({ id, value }) => (
                <option key={id} value={id}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </section>
        <S.Container>
          {challengeList.map(
            (
              {
                challengeId,
                challengeTitle,
                challengeDescription,
                challengeRepImagePath,
                challengeEndDate,
              },
              index
            ) => (
              <React.Fragment key={index}>
                {isLastMember(challengeList.length - 1, index) ? (
                  <>
                    <Challenge
                      key={challengeId}
                      id={challengeId}
                      title={challengeTitle}
                      description={challengeDescription}
                      image={challengeRepImagePath}
                      endDate={challengeEndDate}
                    />
                    {challengeTotalPages !== pageNumber ? (
                      <div ref={ref} />
                    ) : null}
                  </>
                ) : (
                  <Challenge
                    key={challengeId}
                    id={challengeId}
                    title={challengeTitle}
                    description={challengeDescription}
                    image={challengeRepImagePath}
                    endDate={challengeEndDate}
                  />
                )}
              </React.Fragment>
            )
          )}
          {isLoading ? <Loading /> : null}
        </S.Container>
      </S.ListContainer>
    </>
  );
}

const isLastMember = (lastIndex, targetIndex) => {
  return lastIndex === targetIndex;
};

const filterList = [
  {
    id: '1',
    filterName: 'popularity',
    value: '조회순',
  },
  {
    id: '2',
    filterName: 'newest',
    value: '최신순',
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
