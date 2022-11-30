import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import * as S from '../../style/MemberList/MemberList.styled';

export default function Member({
  name,
  badge,
  followerCount,
  created_at,
  image,
}) {
  const date = format(parseISO(created_at), 'yyyy-MM-dd');

  return (
    <S.UserContainer>
      <Link to={`/profile/${name}`}>
        <div>
          <img alt="memberImage" src={image} />
          <span>{name}</span>
        </div>
        <div>{badge}</div>
        <div>{followerCount}</div>
        <div>{date}</div>
      </Link>
    </S.UserContainer>
  );
}
