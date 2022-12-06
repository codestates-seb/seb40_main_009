import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  HeaderContainer,
  Container,
  Logo,
  ChallengeButton,
  Search,
  UserSearchResult,
  Icon,
  Select,
  DropdownMypage,
  DropdownLogout,
} from '../../style/Common/HeaderStyle';

import KakaoLoginButton from '../../image/kakaoIcon.png';
import LogoImage from '../../image/logo.jpg';
import { REST_API_KEY, REDIRECT_URI } from '../Login/KakaoLoginData';
import { LoginState } from '../Login/KakaoLoginData';
import { FaRunning } from 'react-icons/fa';
import { TiArrowDownThick, TiArrowUpThick } from 'react-icons/ti';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { moneyState } from '../../atoms/atoms';

export default function Header() {
  const navigate = useNavigate();
  const [searchFilterValue, setSearchFilterValue] = useState('challenge');
  const [searchValue, setSearchValue] = useState('');
  const [members, setMembers] = useState([]);
  const [challengeList, setChallengeList] = useState([]);
  const [searchBox, setSearchBox] = useState(true);
  const [view, setView] = useState(false);
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 카카오로그인 api로 이동
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const memberName = localStorage.getItem('LoginName');
  const memberMoney = localStorage.getItem('memberMoney');

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

  const logOut = () => {
    window.localStorage.clear();
    setLoginState(false);
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      moveSearchResultPage();
    }
  };

  const tokenRefresh = async () => {
    try {
      const response = await axios.get('/token', {
        headers: {
          'ngrok-skip-browser-warning': 'none',
          Refresh: localStorage.getItem('refreshToken'),
        },
      });
      localStorage.setItem(
        'authorizationToken',
        response.headers.authorization
      );
      localStorage.setItem('loginPersistTime', Date.now() + 900000);
      console.log(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (
      Number(Date.now()) >=
      Number(localStorage.getItem('loginPersistTime') + 900000)
    ) {
      window.localStorage.clear();
      setLoginState(false);
    }

    if (
      Number(Date.now()) >= Number(localStorage.getItem('loginPersistTime'))
    ) {
      tokenRefresh();
      console.log('현재시각', Number(Date.now()));
      console.log('설정시간', Number(localStorage.getItem('loginPersistTime')));
      console.log(
        Number(Date.now()) > Number(localStorage.getItem('loginPersistTime'))
      );
    }
  });

  return (
    <HeaderContainer>
      <Container>
        {/* <FaRunning
          style={{ color: '#8673ff', fontSize: '25px', marginLeft: '5%' }}
        /> */}
        {/* <Logo onClick={NavigateMainPage}>슬기로운 생활</Logo> */}
        <img
          style={{
            width: '7%',
            cursor: 'pointer',
            marginLeft: '5%',
            marginRight: '10%',
          }}
          onClick={NavigateMainPage}
          src={LogoImage}
          alt="슬기로운생활로고 사진"
        />

        <ChallengeButton onClick={NavigateChallengePage}>
          Challenge
        </ChallengeButton>
        <ChallengeButton
          style={{ marginRight: '8%' }}
          onClick={NavigateMemberPage}
        >
          Ranking
        </ChallengeButton>
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
            onKeyPress={onKeyPress}
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
                .slice(0, 10)
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
          <div
            style={{
              width: '800px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              marginRight: '5%',
            }}
          >
            <Link to={'/ordersheet'} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  color: 'black',
                }}
              >
                💰
                {memberMoney
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                &nbsp; 포인트
              </div>
            </Link>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                marginLeft: '2%',
              }}
            >
              반가워요,
            </div>

            <div style={{ color: '#8672FF' }}> {memberName} 님!</div>

            <ul
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? (
                <IoIosArrowUp style={{ color: '#8673FF', cursor: 'pointer' }} />
              ) : (
                <IoIosArrowDown style={{ color: 'black', cursor: 'pointer' }} />
              )}
              {view && (
                <div
                  style={{
                    position: 'absolute',
                    top: '65%',
                    right: '10%',
                    backgroundColor: '#F2F4FE',
                    padding: '20px 10px',
                    borderRadius: '10px',
                    color: '#787878',
                  }}
                >
                  <DropdownMypage
                    style={{
                      marginBottom: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={navigateMypage}
                  >
                    마이페이지
                  </DropdownMypage>
                  <DropdownLogout
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={logOut}
                  >
                    로그아웃
                  </DropdownLogout>
                </div>
              )}
            </ul>
          </div>
        ) : (
          <div
            style={{
              color: 'black',
              display: 'flex',
              width: '800px',
              alignItems: 'center',
              justifyContent: 'end',
              marginRight: '8%',
            }}
          >
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
