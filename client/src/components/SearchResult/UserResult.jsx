import User from '../UserList/UserList';
import * as U from '../../style/UserList/UserList.styled';

function UserResult() {
  return (
    <U.Container>
      <U.IndexContainer>
        <div>이름</div>
        <div>등급</div>
        <div>인기도</div>
        <div>가입일</div>
      </U.IndexContainer>
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </U.Container>
  );
}

export default UserResult;
