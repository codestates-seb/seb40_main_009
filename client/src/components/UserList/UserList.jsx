import styled from 'styled-components';

const UserContainer = styled.div`
  width: 80%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  > div {
    width: 25%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 30px;
      border-radius: 100px;
    }
    > span {
      padding-left: 10px;
    }
  }
  :hover {
    border: 2px solid #8673ff;
    font-weight: bold;
  }
`;

function User() {
  return (
    <>
      <UserContainer>
        <div>
          <img
            alt="사진"
            src="https://www.fnnews.com/resource/media/image/2022/06/08/202206080919125712_l.jpg"
          />
          <span>UserName</span>
        </div>
        <div>UserGrade</div>
        <div>UserPopularity</div>
        <div>UserCreatedAt</div>
      </UserContainer>
    </>
  );
}

export default User;
