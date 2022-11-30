import axios from 'axios';
import { useEffect, useState } from 'react';

import * as U from '../../style/MemberList/MemberList.styled';

import Member from '../MemberList/Member';

export default function MemberResult({ searchValue }) {
  const [memberList, setMemberList] = useState([]);

  /**멤버 검색 결과 데이터 요청 */
  const memberSearch = async () => {
    try {
      const response = await axios.get(
        `/member/search/member?name=${searchValue}&page=1&size=10`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'none',
          },
        }
      );
      const member = response.data.data;
      setMemberList(member);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    memberSearch();
  }, []);

  return (
    <U.Container>
      <U.IndexContainer>
        <div>이름</div>
        <div>등급</div>
        <div>인기도</div>
        <div>가입일</div>
      </U.IndexContainer>
      {memberList.map(
        ({
          memberId,
          memberName,
          memberBadge,
          followerCount,
          created_at,
          memberImagePath,
        }) => (
          <Member
            key={memberId}
            id={memberId}
            name={memberName}
            badge={memberBadge}
            followerCount={followerCount}
            created_at={created_at}
            image={memberImagePath}
          />
        )
      )}
    </U.Container>
  );
}
