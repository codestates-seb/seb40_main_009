import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../style/Common/HeaderStyle';

function Header() {
  const navigate = useNavigate();
  // 메인페이지로 이동
  const LinkMainPage = () => {
    navigate('/');
  };
  // 챌린지 리스트페이지로 이동
  const LinkChallengePage = () => {
    navigate('/challengelist');
  };

  // 유저 리스트페이지로 이동
  const LinkUserPage = () => {
    navigate('/userlist/*');
  };

  return (
    <S.HeaderContainer>
      <S.Container>
        <S.Logo onClick={LinkMainPage}>슬기로운 생활</S.Logo>
        <S.ChallengeBtn onClick={LinkChallengePage}>Challenge</S.ChallengeBtn>
        <S.ChallengeBtn onClick={LinkUserPage}>User</S.ChallengeBtn>
        <S.Search>
          <input
            type="text"
            placeholder="유저이름 또는 챌린지이름을 검색해주세요."
          />
          <S.Icon />
        </S.Search>
        <div>로그인버튼</div>
      </S.Container>
    </S.HeaderContainer>
  );
}

export default Header;
