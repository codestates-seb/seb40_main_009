import * as U from '../../style/MemberList/MemberList.styled';
import Member from '../MemberList/MemberList';

export default function MemberResult() {
  return (
    <U.Container>
      <U.IndexContainer>
        <div>이름</div>
        <div>등급</div>
        <div>인기도</div>
        <div>가입일</div>
      </U.IndexContainer>
      <Member />
    </U.Container>
  );
}
