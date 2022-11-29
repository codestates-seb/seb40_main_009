import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';

import * as S from '../../style/MemberList/MemberList.styled';

export default function Member({ id, name, badge, followerCount, created_at }) {
  const date = format(parseISO(created_at), 'yyyy-MM-dd');

  return (
    <S.UserContainer>
      <Link to={`/profile/${name}`}>
        <div>
          <img
            alt="사진"
            src="https://www.fnnews.com/resource/media/image/2022/06/08/202206080919125712_l.jpg"
          />
          <span>{name}</span>
        </div>
        <div>{badge}</div>
        <div>{followerCount}</div>
        <div>{date}</div>
      </Link>
    </S.UserContainer>
  );
}
