import { useState } from 'react';

import * as S from '../style/UserList/UserList.styled';

import User from '../components/UserList/UserList';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading/Loading';

export default function UserList() {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [checkedFilter, setCheckedFilter] = useState(1);

  const handleClick = (event) => {
    const { value } = event.currentTarget;
    setCheckedFilter(value);
  };

  const tabs = [
    {
      id: 1,
      title: '등급순',
    },
    {
      id: 2,
      title: '인기순',
    },
    {
      id: 3,
      title: '가입순',
    },
  ];

  // 회원 조회 (등급 memberBadge / 인기 followerCount / 가입일순 memberId)
  const getMemberList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/member?page=1&size=109&sort=memberId`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const members = response.data.data;
      console.log(members);
      setMembers(members);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getMemberList();
  }, [checkedFilter]);

  if (isLoading) return <Loading />;

  return (
    <S.ListContainer>
      {/* <section>
        {tabs.map(({ id, title }) => (
          <button
            key={id}
            value={id}
            onClick={handleClick}
            // className={checkedFilter === id && 'clickedBtn'}
          >
            {title}
          </button>
        ))}
      </section> */}
      <S.Container>
        <S.IndexContainer>
          <div>이름</div>
          <div>등급</div>
          <div>인기도</div>
          <div>가입일</div>
        </S.IndexContainer>
        {members.map(
          ({
            memberId,
            memberName,
            memberBadge,
            followerCount,
            created_at,
          }) => (
            <User
              key={memberId}
              memberId={memberId}
              memberName={memberName}
              memberBadge={memberBadge}
              followerCount={followerCount}
              created_at={created_at}
            />
          )
        )}
      </S.Container>
    </S.ListContainer>
  );
}
