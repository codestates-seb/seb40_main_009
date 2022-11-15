import React from 'react';
// import { useNavigate } from 'react-router-dom';
import * as S from '../../style/Common/HeaderStyle';

function Header() {
  //   const navigate = useNavigate();
  //   const LinkMainPage = () => {
  //     navigate('/');
  //   };

  //   const LinkChallengePage = () => {
  //     navigate('/challengelist');
  //   };

  return (
    <S.HeaderContainer>
      <S.Container>
        <S.Logo>슬기로운 생활</S.Logo>
        <S.ChallengeBtn>Challenge</S.ChallengeBtn>
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
