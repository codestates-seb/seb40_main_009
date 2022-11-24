import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  HeaderContainer,
  Container,
  Logo,
  ChallengeButton,
  Search,
  UserSearchResult,
  Icon,
} from '../../style/Common/HeaderStyle';

function Header() {
  const navigate = useNavigate();
  const [searchFilterValue, setSearchFilterValue] = useState('challenge');
  const [searchValue, setSearchValue] = useState('');
  const [members, setMembers] = useState([]);
  const [result, setResult] = useState();
  // const result = useRef();
  // console.log('result>>', result);

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

  //검색필터 데이터
  const searchFilterData = [
    { id: 1, value: 'challenge' },
    { id: 2, value: 'member' },
  ];

  //검색필터가 유저일 때 유저조회(등급순)
  const getMembers = async () => {
    try {
      // const response = await axios.get(`/member?page=1&size=10&sort=memberId`, {
      const response = await axios.get(`/member`, {
        headers: {
          'ngrok-skip-browser-warning': 'none',
        },
      });
      // const memberList = response.data.data;
      const memberList = response.data;
      console.log('memberList>>>>>', memberList);
      setMembers(memberList);
    } catch (error) {
      console.error('error', error);
    }
  };

  //유저조회 axios 실행
  useEffect(() => {
    if (searchFilterValue === 'member') {
      getMembers();
    } else if (searchFilterValue === 'challenge') {
    }
  }, [searchFilterValue]);

  //자동완성 결과 클릭시 인풋값 변경
  const inputValueChange = (name) => {
    setSearchValue(name);
  };

  //검색클릭시 검색결과창으로 이동
  const moveSearchResultPage = () => {};

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
          <select>
            {searchFilterData.map((element) => {
              return <option key={element.id}>{element.value}</option>;
            })}
          </select>
        </div>
        <Search>
          <input
            id="search"
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          {searchValue !== '' && members !== [] ? (
            <ul>
              {members
                .filter(
                  (member) =>
                    member.memberName.toLowerCase().indexOf(searchValue) !== -1
                )
                .splice(0, 10)
                .map((searchResult) => (
                  <UserSearchResult
                    key={searchResult.memberId}
                    onClick={() => {
                      inputValueChange(searchResult.memberName);
                    }}
                  >
                    {searchResult.memberName}
                  </UserSearchResult>
                ))}
            </ul>
          ) : null}
          <Icon onClick={moveSearchResultPage} />
        </Search>
        <div style={{ color: 'black' }}>로그인버튼</div>
      </Container>
    </HeaderContainer>
  );
}

export default Header;
