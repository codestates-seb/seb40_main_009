import styled from 'styled-components';

import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillInstagram,
} from 'react-icons/ai';

export const FooterContainer = styled.footer`
  margin-top: 80px;
  background-color: #8673ff;
  width: 100%;
  color: #ffffff;
  padding: 1.5% 0;
`;

export const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Logo = styled.div`
  margin-right: auto;
  & .name {
    font-size: 23px;
    margin-bottom: 3%;
  }
  & .text {
    font-size: 15px;
  }
`;

export const LinkContainer = styled.div`
  margin-left: 5%;
  & div {
    margin-bottom: 10%;
    cursor: pointer;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5% 0 1% 0;
  & .name {
    margin-right: 2%;
  }
  & .icon {
    width: 10%;
  }
  & + .text {
    font-size: 13.5px;
    display: flex;
    justify-content: center;
  }
`;

export const GithubIcon = styled(AiFillGithub)`
  margin-right: 5%;
`;
export const TwitterIcon = styled(AiFillTwitterCircle)`
  margin-right: 5%;
`;

export const LinkedinIcon = styled(AiFillLinkedin)`
  margin-right: 5%;
`;

export const InstagramIcon = styled(AiFillInstagram)`
  margin-right: 5%;
`;
