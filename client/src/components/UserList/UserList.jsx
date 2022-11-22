import * as S from '../../style/UserList/UserList.styled';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';

function User({
  memberId,
  memberName,
  memberBadge,
  followerCount,
  created_at,
}) {
  const date = format(parseISO(created_at), 'yyyy-MM-dd');

  return (
    <S.UserContainer>
      <Link to={`/profile/${memberId}`}>
        <div>
          <img
            alt="사진"
            src="https://www.fnnews.com/resource/media/image/2022/06/08/202206080919125712_l.jpg"
          />
          <span>{memberName}</span>
        </div>
        <div>{memberBadge}</div>
        <div>{followerCount}</div>
        <div>{date}</div>
      </Link>
    </S.UserContainer>
  );
}

export default User;
