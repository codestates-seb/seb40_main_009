import styled from 'styled-components';
import User from '../components/UserList/UserList';

const UserListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  gap: 4px;
`;

const IndexContainer = styled.section`
  width: 80%;
  height: 30px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #aec4fa;
  > div {
    width: 25%;
    text-align: center;
  }
`;

function UserList() {
  return (
    <UserListContainer>
      <div>필터</div>
      <IndexContainer>
        <div>이름</div>
        <div>등급</div>
        <div>인기도</div>
        <div>가입일</div>
      </IndexContainer>
      <User />
      <User />
      <User />
      <User />
      <User />
    </UserListContainer>
  );
}

export default UserList;
