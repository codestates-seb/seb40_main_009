import { useState } from 'react';

import * as S from '../style/UserList/UserList.styled';

import User from '../components/UserList/UserList';

export default function UserList() {
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

  return (
    <S.ListContainer>
      <section>
        {tabs.map(({ id, title }) => (
          <button
            key={id}
            value={id}
            onClick={handleClick}
            className={checkedFilter === id ? 'clickedBtn' : null}
          >
            {title}
          </button>
        ))}
      </section>
      <S.Container>
        <S.IndexContainer>
          <div>이름</div>
          <div>등급</div>
          <div>인기도</div>
          <div>가입일</div>
        </S.IndexContainer>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </S.Container>
    </S.ListContainer>
  );
}
