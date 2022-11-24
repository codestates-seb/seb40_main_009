import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import * as S from '../style/MemberList/MemberList.styled';

import Loading from '../components/Loading/Loading';
import Member from '../components/MemberList/MemberList';
import { useInView } from 'react-intersection-observer';

export default function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState('memberBadge');
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const handleFilter = (event) => {
    const { value } = event.currentTarget;
    setCheckedFilter(value);
  };

  // 회원 조회 필터링 (등급 memberBadge / 인기 followerCount / 가입일순 memberId)
  const memberFiltering = useCallback(async () => {
    setLoading(true);
    setMemberList([]);
    try {
      const response = await axios.get(
        `/member?page=1&size=10&sort=${checkedFilter}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;
      console.log('멤바', members);
      setMemberList(members);
      console.log('멤바리스트', memberList);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  }, [checkedFilter]);

  // 필터에 맞게 서버에서 데이터 가져오기
  useEffect(() => {
    memberFiltering();
  }, [memberFiltering]);

  // 무한 스크롤
  // const getMemberList = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `/member?page=${page}&size=10&sort=${checkedFilter}`,
  //       {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'none',
  //         },
  //       }
  //     );
  //     const members = response.data.data;

  //     setMemberList((prevMembers) => [...prevMembers, ...members]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // }, [page]);

  // useEffect(() => {
  //   getMemberList();
  // }, [getMemberList]);

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, isLoading]);
  // console.log('page', page);
  // console.log(inView, isLoading);

  if (isLoading) return <Loading />;

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
            { memberId, memberName, memberBadge, followerCount, created_at },
            index
          ) => (
            <React.Fragment key={index}>
              {memberList.length - 1 === index ? (
                <Member
                  key={memberId}
                  memberId={memberId}
                  memberName={memberName}
                  memberBadge={memberBadge}
                  followerCount={followerCount}
                  created_at={created_at}
                  ref={ref}
                />
              ) : (
                <Member
                  key={memberId}
                  memberId={memberId}
                  memberName={memberName}
                  memberBadge={memberBadge}
                  followerCount={followerCount}
                  created_at={created_at}
                />
              )}
            </React.Fragment>
          )
        )}

        {/* {members.map(
          ({
            memberId,
            memberName,
            memberBadge,
            followerCount,
            created_at,
          }) => (
            <Member
              key={memberId}
              memberId={memberId}
              memberName={memberName}
              memberBadge={memberBadge}
              followerCount={followerCount}
              created_at={created_at}
            />
          )
        )} */}
      </S.Container>
    </S.ListContainer>
  );
}

const filterList = [
  { id: 0, title: '이름', value: 'memberBadge' },
  {
    id: 1,
    title: '등급',
    value: 'memberBadge',
  },
  {
    id: 2,
    title: '인기도',
    value: 'followerCount',
  },
  {
    id: 3,
    title: '가입일',
    value: 'memberId',
  },
];
