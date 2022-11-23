import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  Container,
  Logo,
  ChallengeButton,
  Search,
  Icon,
} from '../../style/Common/HeaderStyle';

function Header() {
  const navigate = useNavigate();
  // 메인페이지로 이동
  const NavigateMainPage = () => {
    navigate('/');
  };

  // 챌린지 리스트페이지로 이동
  const NavigateChallengePage = () => {
    navigate('/challengelist');
  };

  // 유저 리스트페이지로 이동
  const NavigateMemberPage = () => {
    navigate('/memberlist');
  };

  return (
    <HeaderContainer>
      <Container>
        <Logo onClick={NavigateMainPage}>슬기로운 생활</Logo>
        <ChallengeButton onClick={NavigateChallengePage}>
          Challenge
        </ChallengeButton>
        <ChallengeButton onClick={NavigateMemberPage}>Ranking</ChallengeButton>
        <Search>
          <input
            type="text"
            placeholder="유저이름 또는 챌린지이름을 검색해주세요."
          />
          <Icon />
        </Search>
        <div>로그인버튼</div>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
