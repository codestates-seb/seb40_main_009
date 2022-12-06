import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

import * as S from '../style/MemberList/MemberList.styled';

import Loading from '../components/Loading/Loading';
import Member from '../components/MemberList/Member';

export default function MemberListPage() {
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState('memberBadge');

  const [pageNumber, setPageNumber] = useState(1);
  const [memberTotalPages, setMemberTotalPages] = useState();
  const [ref, inView] = useInView();

  const handleFilter = (event) => {
    const { value } = event.currentTarget;
    setCheckedFilter(value);
  };

  /** 회원 조회 필터 (등급 memberBadge / 인기 followerCount / 가입일순 memberId)*/
  const memberFiltering = useCallback(async () => {
    setLoading(true);
    setPageNumber(1);
    setMemberList([]);

    try {
      const response = await axios.get(
        `/member?page=${pageNumber}&size=15&sort=${checkedFilter}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;
      setMemberTotalPages(response.data.pageInfo.totalPages);
      setMemberList(members);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [checkedFilter]);

  /** 필터별 데이터 가져오기*/
  useEffect(() => {
    memberFiltering();
  }, [memberFiltering]);

  /** 무한 스크롤*/
  const getMemberList = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/member?page=${pageNumber}&size=15&sort=${checkedFilter}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;

      if (pageNumber !== 1) {
        setMemberList((prevMembers) => [...prevMembers, ...members]);
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
    <S.ListContainer>
      <S.Container>
        <S.IndexContainer>
          {filterList.map(({ id, title, value }) => (
            <button onClick={handleFilter} key={id} value={value}>
              {title}
            </button>
          ))}
        </S.IndexContainer>
        {memberList.map(
          (
            {
              id,
              memberName,
              memberBadge,
              followerCount,
              created_at,
              memberImagePath,
            },
            index
          ) => (
            <React.Fragment key={index}>
              {isLastMember(memberList.length - 1, index) ? (
                <>
                  <Member
                    id={id}
                    name={memberName}
                    badge={memberBadge}
                    followerCount={followerCount}
                    created_at={created_at}
                    image={memberImagePath}
                  />
                  {memberTotalPages !== pageNumber ? (
                    <div ref={ref}></div>
                  ) : null}
                </>
              ) : (
                <Member
                  id={id}
                  name={memberName}
                  badge={memberBadge}
                  followerCount={followerCount}
                  created_at={created_at}
                  image={memberImagePath}
                />
              )}
            </React.Fragment>
          )
        )}
        {isLoading ? <Loading /> : null}
      </S.Container>
    </S.ListContainer>
  );
}

const isLastMember = (lastIndex, targetIndex) => {
  return lastIndex === targetIndex;
};

const filterList = [
  { id: 0, title: '이름', value: 'memberBadge' },
  {
    id: 1,
    title: '등급 🔽',
    value: 'memberBadge',
  },
  {
    id: 2,
    title: '인기도 🔽',
    value: 'followerCount',
  },
  {
    id: 3,
    title: '가입일 🔽',
    value: 'memberId',
  },
];
