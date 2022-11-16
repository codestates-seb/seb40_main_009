import * as S from '../style/UserList/UserList.styled';
import User from '../components/UserList/UserList';
import { useState } from 'react';

function UserList() {
  const [checkedFilter, setCheckedFilter] = useState(1);
  const gradeFilter = () => {
    setCheckedFilter(1);
  };

  const voteFilter = () => {
    setCheckedFilter(2);
  };

  const createdFilter = () => {
    setCheckedFilter(3);
  };

  console.log(checkedFilter);

  return (
    <S.ListContainer>
      <section>
        {checkedFilter === 1 ? (
          <button className="clickedBtn">등급순</button>
        ) : (
          <button onClick={gradeFilter}>등급순</button>
        )}
        {checkedFilter === 2 ? (
          <button className="clickedBtn">인기순</button>
        ) : (
          <button onClick={voteFilter}>인기순</button>
        )}
        {checkedFilter === 3 ? (
          <button className="clickedBtn">가입순</button>
        ) : (
          <button onClick={createdFilter}>가입순</button>
        )}
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

export default UserList;
