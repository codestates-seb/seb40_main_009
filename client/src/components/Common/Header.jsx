import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import {
  HeaderContainer,
  Container,
  Logo,
  ChallengeButton,
  Search,
  UserSearchResult,
  Icon,
  Select,
} from '../../style/Common/HeaderStyle';

import KakaoLoginButton from '../../image/kakaoIcon.png';
import { REST_API_KEY, REDIRECT_URI } from '../Login/KakaoLoginData';
import { LoginState } from '../Login/KakaoLoginData';

export default function Header() {
  const navigate = useNavigate();
  const [searchFilterValue, setSearchFilterValue] = useState('challenge');
  const [searchValue, setSearchValue] = useState('');
  const [members, setMembers] = useState([]);
  const [challengeList, setChallengeList] = useState([]);
  const [user, setUser] = useState([]);
  const [searchBox, setSearchBox] = useState(true);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // 카카오로그인 api로 이동
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const memberName = localStorage.getItem('LoginName');

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

  //검색클릭시 검색결과창으로 이동
  const moveSearchResultPage = () => {
    setSearchBox(false);
    window.location.reload();
    navigate(`/search/${searchFilterValue}/${searchValue}`);
  };

  // 마이페이지로 이동
  const navigateMypage = () => {
    navigate(`/profile/${memberName}`);
  };

  //검색필터 데이터
  const searchFilterData = [
    { id: 1, value: 'challenge' },
    { id: 2, value: 'member' },
  ];

  //검색필터가 유저일 때 유저조회(맴버이름만)
  const getMembers = async () => {
    try {
      const response = await axios.get(`/member/names`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      const memberList = response.data.data;
      setMembers(memberList);
    } catch (error) {
      console.error('error', error);
    }
  };

  //검색필터가 챌린지일 때 챌린지조회(이름만)
  const getChallenges = async () => {
    try {
      const response = await axios.get(`/challenges/titles`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      const challengeList = response.data.data;
      setChallengeList(challengeList);
    } catch (error) {
      console.error('error', error);
    }
  };

  //유저 ,챌린지 조회 axios 실행
  useEffect(() => {
    if (searchFilterValue === 'member') {
      getMembers();
    } else if (searchFilterValue === 'challenge') {
      getChallenges();
    }
  }, [searchFilterValue]);

  //자동완성 결과 클릭시 인풋값 변경
  const inputValueChange = (name) => {
    setSearchValue(name);
  };

  //로그인 유저 조회
  const getUser = async () => {
    try {
      const response = await axios.get(`/member/${memberName}`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Authorization:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MUBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.U8NmMuT3VVJGhaBbe33gvm5WnEBHQFRFNwogwzLwYNYfa2BdluAbSRPu81y29LGQaLxi-AHvwmd-6ONPwR_KMA',
        },
      });
      const userInfo = response.data.data;
      setUser(userInfo);
    } catch (error) {
      console.error('error', error);
    }
  };

  //유저조회 axios 실행
  useEffect(() => {
    getUser();
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('authorizationToken');
    window.localStorage.removeItem('LoginId');
    window.localStorage.removeItem('LoginName');
    setLoginState(false);
  };

  return (
    <HeaderContainer>
      <Container>
        <Logo onClick={NavigateMainPage}>슬기로운 생활</Logo>
        <ChallengeButton onClick={NavigateChallengePage}>
          Challenge
        </ChallengeButton>
        <ChallengeButton onClick={NavigateMemberPage}>Ranking</ChallengeButton>
        <div
          style={{ color: 'black' }}
          onChange={(event) => setSearchFilterValue(event.target.value)}
        >
          <Select>
            {searchFilterData.map((element) => {
              return <option key={element.id}>{element.value}</option>;
            })}
          </Select>
        </div>
        <Search>
          <input
            id="search"
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setSearchBox(true);
            }}
          />
          {/* 유저검색 */}
          {searchValue !== '' &&
          searchBox &&
          members !== [] &&
          searchFilterValue === 'member' ? (
            <ul>
              {members
                .filter((member) => member.indexOf(searchValue) !== -1)
                .splice(0, 10)
                .map((searchResult, index) => (
                  <UserSearchResult
                    key={index}
                    onClick={() => {
                      setSearchBox(false);
                      inputValueChange(searchResult);
                    }}
                  >
                    {searchResult}
                  </UserSearchResult>
                ))}
            </ul>
          ) : null}
          {/* 챌린지 검색 */}
          {searchValue !== '' &&
          searchBox &&
          challengeList !== [] &&
          searchFilterValue === 'challenge' ? (
            <ul>
              {challengeList
                .filter(
                  (challenge) =>
                    challenge.challengeTitle.indexOf(searchValue) !== -1
                )
                .splice(0, 10)
                .map((searchResult, index) => (
                  <UserSearchResult
                    key={index}
                    onClick={() => {
                      setSearchBox(false);
                      inputValueChange(searchResult.challengeTitle);
                    }}
                  >
                    {searchResult.challengeTitle}
                  </UserSearchResult>
                ))}
            </ul>
          ) : null}
          <Icon onClick={moveSearchResultPage} />
        </Search>
        {loginState ? (
          <div style={{ color: 'black', display: 'flex' }}>
            <img
              style={{ width: '30px', borderRadius: '50px' }}
              src={user.memberImagePath}
              alt="유저이미지"
              onClick={navigateMypage}
            />
            <div onClick={logOut}>로그아웃</div>
          </div>
        ) : (
          <div style={{ color: 'black' }}>
            <img
              src={KakaoLoginButton}
              alt="로그인 버튼"
              onClick={handleLogin}
            />
          </div>
        )}
      </Container>
    </HeaderContainer>
  );
}
