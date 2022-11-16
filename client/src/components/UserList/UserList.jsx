import * as S from '../../style/UserList/UserList.styled';

function User() {
  return (
    <S.UserContainer>
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
    </S.UserContainer>
  );
}

export default User;
