import { useNavigate } from 'react-router-dom';

import {
  FooterContainer,
  Container,
  Flex,
  Logo,
  LinkContainer,
  DescriptionContainer,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from '../../style/Common/FooterStyle';

export default function Footer() {
  const instagramUrl = 'https://www.instagram.com/';
  const githubUrl = 'https://github.com/codestates-seb/seb40_main_009';
  const twitterUrl = 'https://twitter.com/?lang=ko';
  const linkedInUrl = 'https://kr.linkedin.com/';

  const navigate = useNavigate();
  // 챌린지 리스트페이지로 이동
  const LinkChallengePage = () => {
    navigate('/challengelist');
  };
  // 유저 리스트로 이동
  const LinkUserPage = () => {
    navigate('/userlist');
  };

  return (
    <FooterContainer>
      <Container>
        <Flex>
          <Logo>
            <div className="name">슬기로운 생활</div>
            <div className="text">
              행복한 삶을 살고 싶다면, 목표에 의지하라.
            </div>
          </Logo>

          <LinkContainer>
            <div onClick={LinkChallengePage}>Challenge</div>
            <div onClick={LinkUserPage}>Ranking</div>
          </LinkContainer>
          <LinkContainer>
            <div>About us</div>
            <div>Contact us</div>
            <div>Join us</div>
          </LinkContainer>
        </Flex>

        <DescriptionContainer>
          <div className="name">슬기로운 생활</div>
          <div className="icon">
            <GithubIcon
              onClick={() => {
                window.open(githubUrl);
              }}
            />
            <InstagramIcon
              onClick={() => {
                window.open(instagramUrl);
              }}
            />
            <TwitterIcon
              onClick={() => {
                window.open(twitterUrl);
              }}
            />
            <LinkedinIcon
              onClick={() => {
                window.open(linkedInUrl);
              }}
            />
          </div>
        </DescriptionContainer>
        <div className="text">
          &#40;주&#41; 슬기로운 생활 | 대표: 김민섭 김유현 오영운 한병주 김은비
          심이서
        </div>
      </Container>
    </FooterContainer>
  );
}
