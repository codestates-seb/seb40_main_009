import axios from 'axios';
import { useEffect, useState } from 'react';

import * as U from '../../style/MemberList/MemberList.styled';

import Member from '../MemberList/MemberList';

export default function MemberResult() {
  const [memberList, setMemberList] = useState([]);

  const challengeSearch = async () => {
    try {
      const response = await axios.get(
        `/member/search/member?name=챌린&page=1&size=10`,
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

  console.log(memberList);

  useEffect(() => {
    challengeSearch();
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
        ({ memberId, memberName, memberBadge, followerCount, created_at }) => (
          <Member
            key={memberId}
            memberId={memberId}
            memberName={memberName}
            memberBadge={memberBadge}
            followerCount={followerCount}
            created_at={created_at}
          />
        )
      )}
    </U.Container>
  );
}
